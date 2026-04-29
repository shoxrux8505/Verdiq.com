/**
 * Automated tests for /api/ai validation, error handling, and rate limiting.
 *
 * Requires a running dev server on TEST_BASE_URL (default http://localhost:3000).
 * Start it with: `bun run dev` in another terminal, then:
 *   bun test tests/api-ai-validation.test.ts
 *
 * Or use the helper: `bun tests/run-api-ai-tests.ts` which boots the server.
 */
import { describe, test, expect, beforeAll } from "bun:test";

const BASE_URL = process.env.TEST_BASE_URL ?? "http://localhost:3000";
const ENDPOINT = `${BASE_URL}/api/ai`;

async function postRaw(body: string, headers: Record<string, string> = {}) {
  return fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body,
  });
}

async function postJson(payload: unknown) {
  return postRaw(JSON.stringify(payload));
}

beforeAll(async () => {
  // Wait up to 30s for the dev server to be reachable.
  for (let i = 0; i < 30; i++) {
    try {
      const r = await fetch(BASE_URL, { method: "GET" });
      if (r.status < 500) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Dev server not reachable at ${BASE_URL}. Run \`bun run dev\` first.`);
});

describe("/api/ai input validation", () => {
  test("malformed JSON → 400 with generic error", async () => {
    const res = await postRaw("{not-json");
    expect(res.status).toBe(400);
    expect(res.headers.get("content-type") ?? "").toContain("application/json");
    const body = await res.json();
    expect(body.error).toMatch(/invalid json/i);
  });

  test("empty body → 400", async () => {
    const res = await postRaw("");
    expect(res.status).toBe(400);
  });

  test("oversized body (>64KB) → 413", async () => {
    const huge = "x".repeat(70 * 1024);
    const res = await postJson({ mode: "chat", messages: [{ role: "user", content: huge }] });
    expect(res.status).toBe(413);
    const body = await res.json();
    expect(body.error).toMatch(/too large/i);
  });

  test("unknown mode → 400", async () => {
    const res = await postJson({ mode: "hack" });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/unknown mode/i);
  });

  test("missing mode → 400", async () => {
    const res = await postJson({ foo: "bar" });
    expect(res.status).toBe(400);
  });

  test("chat with no messages → 400", async () => {
    const res = await postJson({ mode: "chat", messages: [] });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/messages required/i);
  });

  test("chat with non-array messages → 400", async () => {
    const res = await postJson({ mode: "chat", messages: "not-an-array" });
    expect(res.status).toBe(400);
  });

  test("chat with only invalid roles → 400 (filtered to empty)", async () => {
    const res = await postJson({
      mode: "chat",
      messages: [
        { role: "hacker", content: "hi" },
        { role: "root", content: "bye" },
      ],
    });
    expect(res.status).toBe(400);
  });

  test("chat with non-string content → 400 (filtered to empty)", async () => {
    const res = await postJson({
      mode: "chat",
      messages: [
        { role: "user", content: 12345 },
        { role: "user", content: { nested: "obj" } },
        { role: "user", content: null },
      ],
    });
    expect(res.status).toBe(400);
  });

  test("score with no answers → 400", async () => {
    const res = await postJson({ mode: "score", answers: [] });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/answers required/i);
  });

  test("score with malformed answers → 400 (filtered)", async () => {
    const res = await postJson({
      mode: "score",
      answers: [{ q: 1, a: 2 }, "string", null, { q: "ok" /* missing a */ }],
    });
    expect(res.status).toBe(400);
  });
});

describe("/api/ai error hygiene", () => {
  test("error responses do not leak stack traces or secrets", async () => {
    const res = await postRaw("{not-json");
    const body = await res.json();
    const text = JSON.stringify(body).toLowerCase();
    expect(text).not.toContain("stack");
    expect(text).not.toContain("/src/");
    expect(text).not.toContain("openai_api_key");
    expect(text).not.toMatch(/\bat\s+\w+\s*\(/); // no "at fn (" stack frames
  });

  test("error responses are always JSON with an `error` field", async () => {
    const cases = [
      { body: "{bad", expected: 400 },
      { body: JSON.stringify({ mode: "nope" }), expected: 400 },
      { body: JSON.stringify({ mode: "chat" }), expected: 400 },
    ];
    for (const c of cases) {
      const res = await postRaw(c.body);
      expect(res.status).toBe(c.expected);
      const body = await res.json();
      expect(typeof body.error).toBe("string");
      expect(body.error.length).toBeGreaterThan(0);
    }
  });
});

describe("/api/ai rate limiting", () => {
  test("burst of >20 requests in <1min → at least one 429", async () => {
    // All 400-bound requests still consume rate-limit budget.
    const reqs = Array.from({ length: 25 }, () => postJson({ mode: "chat", messages: [] }));
    const results = await Promise.all(reqs);
    const got429 = results.some((r) => r.status === 429);
    expect(got429).toBe(true);
  }, 30_000);
});
