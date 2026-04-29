/**
 * Automated tests for /api/ai validation, error handling, and rate limiting.
 *
 * Targets a running server. Set TEST_BASE_URL to override (defaults to the
 * preview URL). Run with: `bun test tests/api-ai-validation.test.ts`
 */
import { describe, test, expect } from "bun:test";

const BASE_URL =
  process.env.TEST_BASE_URL ??
  "https://id-preview--02fa2373-1b3e-44b8-8ed0-7f1f079d1e16.lovable.app";

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

function expectJsonError(res: Response) {
  expect(res.headers.get("content-type") ?? "").toContain("application/json");
}

describe("/api/ai validation", () => {
  test("malformed JSON → 400", async () => {
    const res = await postRaw("{not-json");
    expect(res.status).toBe(400);
    expectJsonError(res);
    const body = await res.json();
    expect(body.error).toMatch(/invalid json/i);
  });

  test("empty body → 400", async () => {
    const res = await postRaw("");
    expect(res.status).toBe(400);
  });

  test("oversized body (>64KB) → 413", async () => {
    // 70KB of payload
    const huge = "x".repeat(70 * 1024);
    const res = await postJson({ mode: "chat", messages: [{ role: "user", content: huge }] });
    expect(res.status).toBe(413);
    expectJsonError(res);
    const body = await res.json();
    expect(body.error).toMatch(/too large/i);
  });

  test("unknown mode → 400", async () => {
    const res = await postJson({ mode: "hack" });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/unknown mode/i);
  });

  test("chat with no messages → 400", async () => {
    const res = await postJson({ mode: "chat", messages: [] });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/messages required/i);
  });

  test("chat with messages of wrong type → 400 (filtered to empty)", async () => {
    const res = await postJson({ mode: "chat", messages: "not-an-array" });
    expect(res.status).toBe(400);
  });

  test("chat with invalid roles only → 400 (filtered)", async () => {
    const res = await postJson({
      mode: "chat",
      messages: [
        { role: "hacker", content: "hi" },
        { role: "root", content: "bye" },
      ],
    });
    expect(res.status).toBe(400);
  });

  test("chat with non-string content → 400 (filtered)", async () => {
    const res = await postJson({
      mode: "chat",
      messages: [
        { role: "user", content: 12345 },
        { role: "user", content: { nested: "obj" } },
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
      answers: [{ q: 1, a: 2 }, "string", null],
    });
    expect(res.status).toBe(400);
  });

  test("error responses never leak internals (no stack/path)", async () => {
    const res = await postRaw("{not-json");
    const body = await res.json();
    const text = JSON.stringify(body).toLowerCase();
    expect(text).not.toContain("stack");
    expect(text).not.toContain("/src/");
    expect(text).not.toContain("openai_api_key");
    expect(text).not.toContain("at ");
  });
});

describe("/api/ai rate limiting", () => {
  test("burst of >20 requests in <1min → at least one 429", async () => {
    const reqs = Array.from({ length: 25 }, () =>
      postJson({ mode: "chat", messages: [] }), // 400, but still counts toward limit
    );
    const results = await Promise.all(reqs);
    const statuses = results.map((r) => r.status);
    const got429 = statuses.some((s) => s === 429);
    expect(got429).toBe(true);
  }, 30_000);
});
