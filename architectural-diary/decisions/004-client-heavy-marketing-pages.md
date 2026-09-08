# 004 — Client-heavy marketing pages with URL-synced filters

- **Date:** 2025-01-21 (`8401b9c`), refined 2025-02-19 (`668c49e`)
- **Status:** Accepted, active
- **Context:** A marketing site with animations (motion), carousels, an interactive
  services explorer, and filterable blog. SEO matters, but only the blog post pages
  and metadata truly need server rendering of content.
- **Decision:** Everything except `app/blog/[slug]/page.tsx` and
  `app/blog/metadata.ts` is a client component (`"use client"`), including the
  whole blog listing. Interactive state:
  - Services explorer reads `?service=<id>` via `useSearchParams` and mirrors
    clicks with `window.history.pushState`.
  - Blog filters (search/tag/category) sync to query params with
    `pushState`/`popstate` and hydrate from the URL on load.
  - `@tanstack/react-query`'s `QueryClientProvider` is wired globally via
    `components/Providers` (a duplicate provider in the root layout was removed in
    `212ba90`), though data fetching is currently static JSON imports.
- **Rationale:** Simplest way to get motion-rich UI; URL-driven filters make
  filtered views shareable and indexable; listing reads a static JSON so client
  rendering costs little.
- **Consequences:**
  - Blog listing HTML is client-rendered — post content reaches crawlers mainly
    through the server-rendered post pages, RSS, and JSON-LD rather than the
    listing itself.
  - Two URL-sync mechanisms (useSearchParams+pushState for services,
    manual pushState/popstate for blog) — keep them straight when editing.
  - react-query is infrastructure-in-waiting: providers exist, queries don't.
