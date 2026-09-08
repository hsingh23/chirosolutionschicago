# Architectural Diary — chirosolutionschicago

A chronological account of how this codebase reached its current shape, with the
decisions behind it. Commit references are post-rewrite hashes (see CHANGELOG.md).

## Timeline

### Phase 0 — Scaffold (2025-01-19)

`7c1e4c5` create-next-app scaffold (Next 14.2.16, TS, Tailwind, Geist fonts).
Within the same day `0adcd41` replaced the scaffold with the complete marketing
site: nine pages, Header/Footer/Providers components, custom Tailwind theme and
shadcn/ui scaffolding — and **downgraded Next.js to 13.5.8** (see
[001-next-13-over-14](decisions/001-next-13-over-14.md)). `1cdff48` normalized
style across the secondary pages.

### Phase 1 — v0.2.0 content iteration on the `blog` branch (2025-01-21)

PR #1 (`6c92185`, body `ab520e2`/`212ba90`) added legal pages, a first blog with
**hardcoded post objects in TSX**, a sitemap, and reworked services/home/footer.
PR #2 (`1c3b626`, body `8401b9c`/`cea3c49`) replaced those hardcoded objects with
a **markdown content pipeline** (gray-matter + remark) and added working client-side
filtering plus the testimonial carousel (see
[002-markdown-blog-pipeline](decisions/002-markdown-blog-pipeline.md) and
[004-client-heavy-marketing-pages](decisions/004-client-heavy-marketing-pages.md)).
`212ba90` removed a duplicate QueryClientProvider that had briefly landed in the
root layout. A copy-paste of Header/Footer/Providers under `app/components/`
survives from this era (see
[006-duplicate-component-directories](decisions/006-duplicate-component-directories.md)).

### Phase 2 — Real imagery (2025-01-24)

`e110dd9` replaced placeholder image paths with real stock photography and an
autoplaying hero video; `fceb17c` added the remaining assets.

### Phase 3 — Content pipeline at scale + PWA (2025-02-19)

`438c334` made the blog a first-class content system: a `postinstall` script
generating `blog-posts.json` + RSS, 11 new posts, deeply expanded services data,
and the npm→pnpm migration. `c71f9b0` (PR #3) layered **PWA support** on top —
next-pwa, service worker, manifest, image runtime caching, immutable cache
middleware, auto-reload hook (see
[003-pwa-image-caching](decisions/003-pwa-image-caching.md)).

### Phase 4 — SEO and polish (2025-02-19)

`fda1490` and `668c49e` built out the **SEO metadata layer**: metadataBase,
per-post OG/Twitter cards, JSON-LD structured data, canonical URLs, URL-synced
blog filters, reading time (see
[005-seo-metadata-pipeline](decisions/005-seo-metadata-pipeline.md)). `9f468a3`
aligned footer links with the service slugs, hid the unfinished Plans page, and
unified the favicon. `200c47c` finished with share-image metadata and blog layout
polish.

### Phase 5 — Documentation (2026-09-08)

History-rewrite (messages only) to conventional commits, then this documentation
set: README, AGENTS.md, CHANGELOG, diary, and `prompt.md`.

## Shape of the system today

- Marketing pages: client components with inline data arrays, Tailwind styling,
  motion animations, one root layout.
- Content: markdown source of truth → generated JSON/RSS at install time; post
  pages re-read markdown server-side at request time.
- Delivery: PWA with CacheFirst image caches and immutable headers; deploy target
  is the production `next build`.
- No backend, no database, no environment variables; booking is delegated to
  Schedulicity and the contact form is front-end only.

## Decision index

| # | Decision | Commit |
| --- | --- | --- |
| 001 | [Stay on Next.js 13.5.8, not 14](decisions/001-next-13-over-14.md) | `0adcd41` |
| 002 | [Markdown blog with build-time JSON/RSS generation](decisions/002-markdown-blog-pipeline.md) | `8401b9c`, `438c334` |
| 003 | [PWA via next-pwa with CacheFirst image caching](decisions/003-pwa-image-caching.md) | `c71f9b0` |
| 004 | [Client-heavy marketing pages, URL-synced filters](decisions/004-client-heavy-marketing-pages.md) | `8401b9c`, `668c49e` |
| 005 | [Metadata/SEO as a generated pipeline](decisions/005-seo-metadata-pipeline.md) | `fda1490`, `668c49e` |
| 006 | [Two component directories (legacy duplicate kept)](decisions/006-duplicate-component-directories.md) | `0adcd41`, `438c334` |
