/**
 * Boots the Vite dev server, waits for it to print its Local URL, then runs
 * the /api/ai validation tests against that URL and shuts the server down.
 * Usage: bun tests/run-api-ai-tests.ts
 */
import { spawn } from "child_process";

console.log("[runner] Starting dev server…");
const server = spawn("bun", ["run", "dev"], {
  env: { ...process.env },
  stdio: ["ignore", "pipe", "pipe"],
});

let baseUrl: string | null = null;
const urlRegex = /(https?:\/\/(?:localhost|127\.0\.0\.1):\d+)/;

const onChunk = (d: Buffer) => {
  const s = d.toString();
  process.stdout.write(`[server] ${s}`);
  if (!baseUrl) {
    const m = s.match(urlRegex);
    if (m) baseUrl = m[1];
  }
};
server.stdout?.on("data", onChunk);
server.stderr?.on("data", onChunk);

async function waitForUrl(timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (baseUrl) {
      try {
        const r = await fetch(baseUrl);
        if (r.status < 500) return baseUrl;
      } catch {
        /* not up yet */
      }
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Dev server did not become reachable in time.");
}

try {
  const url = await waitForUrl();
  console.log(`[runner] Server up at ${url}. Running tests…\n`);

  const test = spawn("bun", ["test", "tests/api-ai-validation.test.ts"], {
    env: { ...process.env, TEST_BASE_URL: url },
    stdio: "inherit",
  });

  const code: number = await new Promise((resolve) => test.on("exit", (c) => resolve(c ?? 1)));
  process.exitCode = code;
} catch (e) {
  console.error("[runner] Failure:", e);
  process.exitCode = 1;
} finally {
  console.log("[runner] Stopping dev server…");
  server.kill("SIGTERM");
}
