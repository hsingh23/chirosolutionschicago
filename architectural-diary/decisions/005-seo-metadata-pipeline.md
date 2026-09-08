# 005 — Metadata/SEO as a generated pipeline

- **Date:** 2025-02-19 (`fda1490`, `668c49e`; sitemap/robots landed earlier in PR #3)
- **Status:** Accepted, active
- **Context:** Local-business SEO is a primary channel for the practice. Blog posts
  need per-page titles/descriptions, canonical URLs, structured data, and social
  previews; the listing needs dynamic counts ("Explore 12+ articles...").
- **Decision:**
  - Root layout sets `metadataBase` (https://www.chirosolutionschicago.com) so
    relative OG image URLs resolve.
  - `app/blog/metadata.ts` derives the blog section's title/description/keywords
    dynamically from the generated `blog-posts.json` (categories, tags, count).
  - `app/blog/[slug]/page.tsx` `generateMetadata` emits per-post OG + Twitter
    `summary_large_image` cards, canonical link, authors, tags, robots, and
    JSON-LD `BlogPosting` + `BreadcrumbList`; OG image prefers frontmatter
    `image` with a category-based fallback (an earlier commit fixed a wrong
    fallback path `/images/blog-<slug>.jpg` → `/images/blog/<slug>.jpg`).
  - The post-processing script enriches the JSON with excerpts, reading time, and
    word count so metadata never re-derives them.
  - `public/sitemap.xml` + `robots.txt` are maintained as committed artifacts;
    `/rss.xml` registered via metadata `alternates`.
- **Rationale:** One pipeline computes content statistics once; every SEO surface
  (HTML meta, JSON-LD, RSS, sitemap) reads from it, keeping titles/descriptions
  consistent.
- **Consequences:**
  - Sitemap is static — new posts require regenerating it (currently manual).
  - The hidden `/plans` page was removed from the sitemap in `9f468a3`; keep
    future hidden pages out of it too.
  - Excerpt quality depends on the "first paragraph" heuristic when frontmatter
    lacks an explicit `excerpt`.
