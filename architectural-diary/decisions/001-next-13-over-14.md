# 001 — Stay on Next.js 13.5.8, not 14

- **Date:** 2025-01-19 (`0adcd41`, replacing scaffold `7c1e4c5` from the same day)
- **Status:** Accepted (implicit; never revisited)
- **Context:** create-next-app generated the repo on Next 14.2.16. The very next
  commit, which replaced the scaffold with the full site, pinned `next` to exactly
  `13.5.8` (no caret) and added `eslint-config-next: 13.5.8` to match.
- **Decision:** Run the site on Next.js 13.5.8 App Router.
- **Rationale:** Not recorded in the repo (commit message was just "init"). Plausible
  drivers at the time: `next-pwa` (added later, PR #3) and the App Router metadata
  API were commonly validated against 13.x, and pinning an exact version avoids
  surprise minor-branch breaks in a low-maintenance marketing site.
- **Consequences:**
  - Modern Next 14+ APIs (typed routes, `next.config` image `qualities`, partial
    prerendering, newer metadata options) must not be assumed.
  - Top-level `metadata.themeColor` (deprecated in 14) still works here — used in
    `app/layout.tsx`.
  - Upgrading would require touching `next-pwa` config (unmaintained upstream) and
    re-testing the whole metadata layer.
