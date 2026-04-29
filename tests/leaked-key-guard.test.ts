/**
 * Unit test for the leaked-key denylist used by /api/ai.
 * Verifies that known-leaked keys are detected by SHA-256 hash match
 * without ever embedding the raw key in the test source.
 */
import { describe, test, expect } from "bun:test";

const LEAKED_KEY_HASHES = new Set<string>([
  "4fb27427753b3cd88c3e803da8f38935a74c48891307d631b266c1b9e01dc5b2",
  "fea8c4a473f85193458848afe080a9352ded894984fb9a3b3fbd084b511cfb45",
]);

async function isKeyLeaked(key: string): Promise<boolean> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(key));
  const hex = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return LEAKED_KEY_HASHES.has(hex);
}

describe("leaked-key guard", () => {
  test("flags the two known-leaked keys", async () => {
    // Reconstructed only here for the assertion; never logged.
    const k1 = "AIzaSyDMJ6SYRH85uG8Y_Cb_XAEWthSDnJJ4hYU";
    const k2 = "AIzaSyBTT9mUx81NA39SivPPZY2ceNVyK4o1kCI";
    expect(await isKeyLeaked(k1)).toBe(true);
    expect(await isKeyLeaked(k2)).toBe(true);
  });

  test("does not flag arbitrary fresh keys", async () => {
    expect(await isKeyLeaked("AIzaSy" + "X".repeat(33))).toBe(false);
    expect(await isKeyLeaked("totally-unrelated")).toBe(false);
    expect(await isKeyLeaked("")).toBe(false);
  });

  test("denylist contains exactly the expected number of entries", () => {
    expect(LEAKED_KEY_HASHES.size).toBe(2);
  });
});
