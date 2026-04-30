# Production Deployment Checklist

A step-by-step guide for taking this project from preview to a hardened production deployment.

---

## 1 · Pre-flight code review

- [ ] All routes under `src/routes/` build without TypeScript errors.
- [ ] No `TODO`, `FIXME`, or placeholder content in shipped pages (especially `src/routes/index.tsx`).
- [ ] `console.log` / debug calls removed from hot paths.
- [ ] No secrets, API keys, or connection strings committed to the repo (`git grep -i "AIza\|sk_\|sb_secret"`).

## 2 · Backend (Lovable Cloud)

- [ ] Database tables have **RLS enabled** and explicit policies for every role.
- [ ] User roles stored in a separate `user_roles` table (never on `profiles`).
- [ ] `cloud_status` reports **ACTIVE_HEALTHY**.
- [ ] Auth providers configured (email + Google) with correct redirect URLs.
- [ ] Email confirmation enabled (do **not** auto-confirm in production).

## 3 · Secrets & API keys

- [ ] `GEMINI_API_KEY` is a freshly issued key — not one previously pasted in chat or committed anywhere.
- [ ] Rotated any key that ever appeared in a public location (chat, repo, screenshot).
- [ ] All third-party keys stored via the **Secrets** manager, not `.env` files in git.
- [ ] Verify the leaked-key denylist in `src/routes/api.ai.ts` does not block your current key (`bun tests/run-api-ai-tests.ts`).

## 4 · API hardening (`/api/ai` and any public endpoints)

- [ ] Rate limiting is active (per-IP sliding window).
- [ ] Request body size cap enforced (currently 64 KB).
- [ ] Input validation: roles, message count, message length all bounded.
- [ ] Errors return generic messages — no stack traces leaked to clients.
- [ ] Webhook routes under `/api/public/*` verify signatures with `timingSafeEqual`.

## 5 · Automated tests

- [ ] `bun tests/run-api-ai-tests.ts` passes (oversized / invalid / malformed payloads).
- [ ] `bun tests/leaked-key-guard.test.ts` passes.
- [ ] Manual smoke test: chat mode streams, score mode returns structured JSON.

## 6 · SEO & metadata

- [ ] Each route file sets a unique `head()` with `<title>` (<60 chars) and meta description (<160 chars).
- [ ] Single `<h1>` per page.
- [ ] `og:image` and `twitter:image` set on leaf routes that have a hero image.
- [ ] `alt` text on all `<img>` tags.
- [ ] Canonical URLs and responsive viewport meta in `__root.tsx`.

## 7 · Performance

- [ ] Images use `.jpg` for photos, `.png` only when transparency is needed.
- [ ] Heavy below-the-fold components use `lazy()` + `<Suspense>`.
- [ ] Framer Motion animations limited to hero / key interactions.
- [ ] Lighthouse score ≥ 90 on Performance and Accessibility.

## 8 · Publish

1. Click **Publish** (top-right on desktop, ⋯ menu on mobile).
2. Confirm the `.lovable.app` URL loads and routes work on hard refresh.
3. In **Project Settings → Domains**, connect your custom domain (A records → `185.158.133.1`, `_lovable` TXT record).
4. Wait for SSL provisioning (typically minutes, up to 72 h for DNS propagation).
5. Set the custom domain as **Primary**.

## 9 · Post-deploy verification

- [ ] Open the production URL in an incognito window — no auth wall unless intended.
- [ ] Test sign-up → email confirmation → sign-in end to end.
- [ ] Trigger one AI chat request and one score request from the live site.
- [ ] Check `cloud_status` again and review edge function logs for errors.
- [ ] Confirm rate limiting actually blocks rapid requests from a single IP.

## 10 · Operational hygiene

- [ ] Publish visibility set correctly (**public** for marketing site, **private** for internal tools).
- [ ] `Edit with Lovable` badge hidden if on Pro+ and undesired.
- [ ] GitHub repo connected so code is mirrored outside Lovable.
- [ ] Database export (CSV) scheduled or performed manually after major changes.
- [ ] Owner has documented how to rotate `GEMINI_API_KEY` and any other secrets.

---

**Rollback plan:** Lovable keeps full version history. If a deploy breaks production, open **History** (clock icon) and restore the last known-good version, then click **Update** in the publish dialog.
