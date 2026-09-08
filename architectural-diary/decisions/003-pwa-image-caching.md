# 003 — PWA via next-pwa with CacheFirst image caching

- **Date:** 2025-02-19 (`c71f9b0`, PR #3)
- **Status:** Accepted, active
- **Context:** Mobile-heavy audience for a local practice site; imagery (Unsplash
  stock + local photos) dominates payload. Site branding also shifted to
  "Natural Chiropractic Solutions" in the same PR.
- **Decision:** Wrap `next.config.mjs` with `next-pwa`:
  - Service worker registered in production only (`disable` in development),
    `skipWaiting: true`, precache of build output (`public/sw.js`, workbox file).
  - Four `runtimeCaching` entries, all `CacheFirst`: external images
    (`images.unsplash.com`/`apm.info`, 30d), `/_next/image` (7d), `/images/*`
    (30d), and any image extension (30d) — each with entry caps.
  - `public/manifest.json` with 64/192/512 icons, theme color `#bccd30`,
    standalone display; apple-web-app metadata in the root layout.
  - `app/hooks/usePWA.tsx` listens for the `controlling` event and force-reloads
    the page when a new service worker activates.
  - `middleware.ts` adds `Cache-Control: public, max-age=31536000, immutable` to
    image requests as a belt-and-braces server-side header.
- **Rationale:** Installable app icon on patients' phones + instant repeat loads
  for an image-heavy marketing site; images are effectively immutable so
  CacheFirst is safe.
- **Consequences:**
  - `public/sw.js` / `public/workbox-*.js` are build artifacts that get rewritten
    on every production build — never hand-edit.
  - Content changes can be masked by aggressive caching; the auto-reload hook is
    the mitigation for SW updates.
  - `next-pwa` is unmaintained upstream — the main blocker to a future Next
    upgrade (with decision 001).
