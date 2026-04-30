import { createFileRoute } from "@tanstack/react-router";
import { getRequestIP, getRequestHeader } from "@tanstack/react-start/server";

const SYSTEM_CHAT = `You are the Verdiq ESG Advisor — an expert AI assistant on Environmental, Social, and Governance topics for startups, SMEs, and investors.

Your job:
- Give concrete, actionable ESG guidance (frameworks: GRI, SASB, TCFD, CSRD, B-Corp).
- Be concise (2–4 short paragraphs max), confident, and use light markdown (bold, lists).
- Tailor advice to early-stage companies when context is unclear.
- Never invent regulations. If unsure, say so.
- Speak in the same language the user writes in (English, Russian, or Uzbek).`;

const SYSTEM_SCORE = `You are the Verdiq ESG Scoring Engine. The user submits answers to 10 ESG questions. You must:

1. Compute three sub-scores (environmental, social, governance), each 0–100.
2. Compute the overall score as the weighted average (E:35%, S:30%, G:35%).
3. Assign a tier: A+ (≥85), A (75–84), B (60–74), C (45–59), D (<45).
4. Return 4 short, concrete, prioritized recommendations addressing the weakest areas.

You MUST call the function 'return_esg_assessment' with the structured result. Do not write prose.`;

interface ChatMessage { role: "user" | "assistant" | "system"; content: string }

// --- Limits ---
const MAX_BODY_BYTES = 64 * 1024; // 64KB request body cap
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2000;
const MAX_ANSWERS = 20;
const MAX_ANSWER_CHARS = 500;
const ALLOWED_ROLES = new Set(["user", "assistant", "system"]);

// --- In-memory rate limiter (per-IP, sliding window) ---
const RATE_LIMIT_MAX = 20; // requests
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // per minute
const ipHits = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const arr = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (arr.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, arr);
    return false;
  }
  arr.push(now);
  ipHits.set(ip, arr);
  // light cleanup
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits) {
      if (v.length === 0 || now - v[v.length - 1] > RATE_LIMIT_WINDOW_MS) ipHits.delete(k);
    }
  }
  return true;
}

const GEMINI_MODEL = "gemini-3-flash-preview";

// SHA-256 hashes of API keys known to be leaked (e.g. pasted in chat,
// committed to public repos). If the configured GEMINI_API_KEY matches
// any of these, we refuse to use it and log a clear admin warning.
// Storing hashes — not the raw keys — keeps this file safe to commit.
const LEAKED_KEY_HASHES = new Set<string>([
  "4fb27427753b3cd88c3e803da8f38935a74c48891307d631b266c1b9e01dc5b2",
  "fea8c4a473f85193458848afe080a9352ded894984fb9a3b3fbd084b511cfb45",
]);

let leakWarningLogged = false;
async function isKeyLeaked(key: string): Promise<boolean> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(key));
  const hex = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return LEAKED_KEY_HASHES.has(hex);
}

async function assertKeyUsable(apiKey: string): Promise<string | null> {
  if (await isKeyLeaked(apiKey)) {
    if (!leakWarningLogged) {
      console.error(
        "[SECURITY] GEMINI_API_KEY matches a known-leaked key. " +
        "Refusing to call the AI provider. " +
        "ROTATE THIS KEY IMMEDIATELY in Google AI Studio (https://aistudio.google.com/apikey) " +
        "and update the GEMINI_API_KEY secret in workspace settings.",
      );
      leakWarningLogged = true;
    }
    return "AI provider key has been disabled by an administrator. Please rotate the key and try again.";
  }
  return null;
}

async function callGateway(body: {
  messages: ChatMessage[];
  stream?: boolean;
  tools?: unknown[];
  tool_choice?: unknown;
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");

  // Translate OpenAI-style payload → Gemini generateContent payload
  const systemMsgs = body.messages.filter((m) => m.role === "system");
  const convoMsgs = body.messages.filter((m) => m.role !== "system");

  const geminiBody: Record<string, unknown> = {
    contents: convoMsgs.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
  };
  if (systemMsgs.length) {
    geminiBody.systemInstruction = { parts: [{ text: systemMsgs.map((m) => m.content).join("\n\n") }] };
  }
  if (body.tools) {
    // Gemini function-calling shape
    const fnDecls = (body.tools as Array<{ function: { name: string; description?: string; parameters: unknown } }>)
      .map((t) => ({
        name: t.function.name,
        description: t.function.description,
        parameters: t.function.parameters,
      }));
    geminiBody.tools = [{ functionDeclarations: fnDecls }];
    geminiBody.toolConfig = { functionCallingConfig: { mode: "ANY" } };
  }

  const action = body.stream ? "streamGenerateContent?alt=sse&" : "generateContent?";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:${action}key=${encodeURIComponent(apiKey)}`;
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(geminiBody),
  });
}

// Transform Gemini SSE stream → OpenAI-style SSE the frontend already parses.
function toOpenAiSseStream(geminiStream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const reader = geminiStream.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buf = "";

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
        return;
      }
      buf += decoder.decode(value, { stream: true });
      let idx: number;
      while ((idx = buf.indexOf("\n")) !== -1) {
        const line = buf.slice(0, idx).replace(/\r$/, "");
        buf = buf.slice(idx + 1);
        if (!line.startsWith("data: ")) continue;
        const json = line.slice(6).trim();
        if (!json) continue;
        try {
          const parsed = JSON.parse(json);
          const text = parsed?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";
          if (text) {
            const chunk = { choices: [{ delta: { content: text } }] };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
          }
        } catch {
          // skip malformed line
        }
      }
    },
    cancel() { reader.cancel(); },
  });
}

function errorResponse(status: number, message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const Route = createFileRoute("/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // --- Rate limit ---
          let ip = "unknown";
          try {
            ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
          } catch {
            ip = "unknown";
          }
          if (!checkRateLimit(ip)) {
            return errorResponse(429, "Too many requests. Please slow down and try again shortly.");
          }

          // --- Body size cap ---
          const contentLength = Number(getRequestHeader("content-length") ?? 0);
          if (contentLength && contentLength > MAX_BODY_BYTES) {
            return errorResponse(413, "Request payload too large.");
          }
          const raw = await request.text();
          if (raw.length > MAX_BODY_BYTES) {
            return errorResponse(413, "Request payload too large.");
          }

          let payload: {
            mode: "chat" | "score";
            messages?: ChatMessage[];
            answers?: Array<{ q: string; a: string }>;
            lang?: string;
          };
          try {
            payload = JSON.parse(raw);
          } catch {
            return errorResponse(400, "Invalid JSON body.");
          }
          // Refuse to use a leaked/known-bad provider key, regardless of mode.
          const configuredKey = process.env.GEMINI_API_KEY;
          if (configuredKey) {
            const blockMsg = await assertKeyUsable(configuredKey);
            if (blockMsg) return errorResponse(503, blockMsg);
          }

          if (payload.mode === "chat") {
            const rawMessages = Array.isArray(payload.messages) ? payload.messages : [];
            const messages: ChatMessage[] = rawMessages
              .slice(-MAX_MESSAGES)
              .filter((m) => m && typeof m.content === "string" && ALLOWED_ROLES.has(m.role))
              .map((m) => ({
                role: m.role,
                content: m.content.slice(0, MAX_MESSAGE_CHARS),
              }));

            if (messages.length === 0) return errorResponse(400, "messages required");

            const resp = await callGateway({
              messages: [{ role: "system", content: SYSTEM_CHAT }, ...messages],
              stream: true,
            });

            if (resp.status === 429) return errorResponse(429, "Rate limit exceeded. Please try again shortly.");
            if (resp.status === 402) return errorResponse(402, "AI credits exhausted. Add funds in Workspace settings.");
            if (!resp.ok || !resp.body) {
              const text = await resp.text().catch(() => "");
              console.error("AI gateway chat error:", resp.status, text);
              return errorResponse(500, "AI service is temporarily unavailable. Please try again.");
            }

            return new Response(toOpenAiSseStream(resp.body), { headers: { "Content-Type": "text/event-stream" } });
          }

          if (payload.mode === "score") {
            const rawAnswers = Array.isArray(payload.answers) ? payload.answers : [];
            const answers = rawAnswers
              .slice(0, MAX_ANSWERS)
              .filter((a) => a && typeof a.q === "string" && typeof a.a === "string")
              .map((a) => ({
                q: a.q.slice(0, MAX_ANSWER_CHARS),
                a: a.a.slice(0, MAX_ANSWER_CHARS),
              }));

            if (answers.length === 0) return errorResponse(400, "answers required");
            const lang = payload.lang === "ru" ? "Russian" : payload.lang === "uz" ? "Uzbek" : "English";

            const userPrompt = `Language for recommendations: ${lang}\n\nUser answers:\n${answers
              .map((a, i) => `${i + 1}. Q: ${a.q}\n   A: ${a.a}`)
              .join("\n")}`;

            const resp = await callGateway({
              messages: [
                { role: "system", content: SYSTEM_SCORE },
                { role: "user", content: userPrompt },
              ],
              tools: [
                {
                  type: "function",
                  function: {
                    name: "return_esg_assessment",
                    description: "Return the ESG assessment.",
                    parameters: {
                      type: "object",
                      properties: {
                        overall: { type: "number", description: "0-100" },
                        environmental: { type: "number" },
                        social: { type: "number" },
                        governance: { type: "number" },
                        tier: { type: "string", enum: ["A+", "A", "B", "C", "D"] },
                        summary: { type: "string", description: "1-2 sentence overall verdict." },
                        recommendations: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              title: { type: "string" },
                              detail: { type: "string" },
                              pillar: { type: "string", enum: ["E", "S", "G"] },
                              impact: { type: "string", enum: ["high", "medium", "low"] },
                            },
                            required: ["title", "detail", "pillar", "impact"],
                          },
                          minItems: 3,
                          maxItems: 5,
                        },
                      },
                      required: ["overall", "environmental", "social", "governance", "tier", "summary", "recommendations"],
                    },
                  },
                },
              ],
            });

            if (resp.status === 429) return errorResponse(429, "Rate limit exceeded. Please try again shortly.");
            if (resp.status === 402) return errorResponse(402, "AI credits exhausted. Add funds in Workspace settings.");
            if (!resp.ok) {
              const text = await resp.text().catch(() => "");
              console.error("AI gateway score error:", resp.status, text);
              return errorResponse(500, "AI service is temporarily unavailable. Please try again.");
            }

            const data = await resp.json();
            const fnCall = data?.candidates?.[0]?.content?.parts?.find((p: { functionCall?: { args: unknown } }) => p.functionCall)?.functionCall;
            if (!fnCall?.args) {
              console.error("No function call returned", JSON.stringify(data).slice(0, 500));
              return errorResponse(500, "AI did not return a structured assessment");
            }
            return new Response(JSON.stringify(fnCall.args), {
              headers: { "Content-Type": "application/json" },
            });
          }

          return errorResponse(400, "Unknown mode");
        } catch (e) {
          console.error("api/ai error:", e);
          return errorResponse(500, "An internal error occurred. Please try again.");
        }
      },
    },
  },
});
