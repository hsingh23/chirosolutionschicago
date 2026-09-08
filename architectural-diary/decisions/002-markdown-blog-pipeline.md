# 002 — Markdown blog with build-time JSON/RSS generation

- **Date:** 2025-01-21 (`8401b9c`, PR #2) then scaled 2025-02-19 (`438c334`)
- **Status:** Accepted, active
- **Context:** The first blog (`ab520e2`) hardcoded two posts as inline objects in
  `app/blog/[slug]/page.tsx`. Adding a post meant editing React code. The practice
  needed many SEO-oriented articles plus an RSS feed.
- **Decision:** Single source of truth is `app/blog/posts/*.md` with YAML frontmatter
  (`title`, `date`, `tags`, `category`, `image`). Two consumers:
  1. `scripts/process-blog-posts.mjs` runs on `postinstall` (and manually), parses
     frontmatter with `gray-matter`, computes excerpt/reading-time/word-count and
     defaults (author "Dr. Daniel M. Dziekan", category "Wellness"), sorts by date,
     and writes `public/blog-posts.json` + `public/rss.xml` (via the `feed` package).
     The blog **listing** imports this JSON.
  2. `app/blog/[slug]/page.tsx` (server component) re-reads the same markdown at
     request time, renders with `remark`/`remark-html` into a `prose` container
     (`@tailwindcss/typography`), and builds per-post metadata.
- **Rationale:** Non-developers can add posts by dropping a file; listings get
  precomputed metadata (cheap import of static JSON) while post pages stay dynamic
  and always current; RSS comes free from the same pass.
- **Consequences:**
  - Committed generated artifacts (`blog-posts.json`, `rss.xml`) can go stale —
    always re-run the script after editing posts.
  - Frontmatter parsing exists in two places (script + page); keep their field
    expectations in sync.
  - `content` is embedded in the JSON, so the listing payload carries full post
    bodies (fine at 12 posts, would need trimming at scale).
