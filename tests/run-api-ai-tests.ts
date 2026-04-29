/**
 * Boots the dev server, runs the /api/ai validation tests, then shuts down.
 * Usage: bun tests/run-api-ai-tests.ts
 */
import { spawn } from "child_process";

const PORT = process.env.PORT ?? "3000";
const BASE_URL = `http://localhost:${PORT}`;

console.log(`[runner] Starting dev server on ${BASE_URL}…`);
const server = spawn("bun", ["run", "dev"], {
  env: { ...process.env, PORT },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverReady = false;
server.stdout?.on("data", (d) => {
  const s = d.toString();
  process.stdout.write(`[server] ${s}`);
  if (s.includes("Local:") || s.includes(`localhost:${PORT}`)) serverReady = true;
});
server.stderr?.on("data", (d) => process.stderr.write(`[server-err] ${d}`));

async function waitForServer(timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(BASE_URL);
      if (r.status < 500) return;
    } catch {
      /* not up */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error("Dev server did not become reachable in time.");
}

try {
  await waitForServer();
  console.log("[runner] Server up. Running tests…\n");

  const test = spawn("bun", ["test", "tests/api-ai-validation.test.ts"], {
    env: { ...process.env, TEST_BASE_URL: BASE_URL },
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
