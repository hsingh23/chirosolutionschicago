# AGENTS.md — working guide for coding agents

Marketing site + blog for Dr. Daniel M. Dziekan's Chicago chiropractic practice
("Natural Chiropractic Solutions"). Next.js 13.5.8 App Router, React 18, TypeScript,
Tailwind 3, markdown-driven blog, PWA via next-pwa. Deployed at
https://www.chirosolutionschicago.com.

## Commands

```bash
pnpm install                # postinstall runs scripts/process-blog-posts.mjs → regenerates public/blog-posts.json + rss.xml
pnpm dev                    # dev server on :3000 (PWA disabled in dev)
pnpm build && pnpm start    # production build; next-pwa emits public/sw.js + workbox-*.js
pnpm lint                   # next lint --fix
node scripts/process-blog-posts.mjs   # re-run after editing app/blog/posts/*.md
```

There are no tests in this repo. Verification is `pnpm build` (catches TS/ESLint
errors) plus manual page checks in `pnpm dev`.

## Architecture map

- **Rendering**: single root layout `app/layout.tsx` (Inter font, global metadata,
  `Providers` → `Header` → `main` → `Footer`). All pages are client components
  except `app/blog/[slug]/page.tsx` and `app/blog/metadata.ts`, which are async
  server components reading the filesystem.
- **Blog content pipeline (two paths — know the difference)**:
  1. *Build time*: `scripts/process-blog-posts.mjs` parses `app/blog/posts/*.md`
     frontmatter → writes `public/blog-posts.json` (excerpts, reading time,
     word count, defaults) and `public/rss.xml` (via `feed`). The blog **listing**
     (`app/blog/page.tsx`) imports the generated JSON.
  2. *Request time*: `app/blog/[slug]/page.tsx` re-reads the same markdown with
     `gray-matter` + `remark`/`remark-html` for the full post page + per-post
     metadata. `app/blog/metadata.ts` derives section metadata from the JSON.
- **Services explorer**: `app/services/page.tsx` holds a hardcoded `services` array
  (id, name, descriptions, FAQs, related posts). Deep links via `/services?service=<id>`
  handled with `useSearchParams` + `pushState`.
- **State/URL sync**: blog filters (search/tag/category) sync to query params with
  `pushState`/`popstate` (no router dependency in that client component).
- **PWA**: `next.config.mjs` wraps the config with `next-pwa` (CacheFirst image
  caching); `app/hooks/usePWA.tsx` reloads the page when a new SW takes control;
  `middleware.ts` sets immutable `Cache-Control` on image paths.
- **Third-party**: Schedulicity booking widget (header/footer buttons and
  `/booking` page, Schedulicity ID `NCST6P`); hero video hosted on imgur;
  remote images from `images.unsplash.com` / `apm.info` (allow-listed in
  `next.config.mjs`).

## Conventions

- Component files in `components/` are PascalCase; page files are `page.tsx` under
  route folders. Client components marked `"use client"`.
- Styling: Tailwind utility classes inline; theme tokens are shadcn-style HSL CSS
  variables in `app/globals.css` mapped through `tailwind.config.ts`. Brand accent
  in practice is Tailwind blue (`blue-600`) on white with gray text; PWA theme
  color `#bccd30`.
- Markdown posts use frontmatter: `title`, `date` (YYYY-MM-DD), `tags` (list),
  `category`, `image` (path under `/images/blog/...`). Author defaults to
  "Dr. Daniel M. Dziekan"; category defaults to "Wellness".
- Commit messages: conventional commits (`type(scope): imperative subject` ≤72
  chars, body explaining the why/what). History was rewritten on 2026-09-08 to
  enforce this — keep it up.

## Gotchas

- **`app/components/` vs `components/`**: both contain Header/Footer/Providers.
  The root layout imports from `components/`; the `app/components` copies are
  legacy/unused — don't edit them by accident.
- **Generated artifacts are committed**: `public/blog-posts.json`, `public/rss.xml`,
  `public/sitemap.xml`, `public/sw.js`, `public/workbox-*.js`. After changing
  posts, re-run the process script or the listing/RSS will be stale; `sw.js`/
  workbox are overwritten by every production build.
- **Next version is 13.5.8** (deliberately downgraded from the scaffold's 14.x) —
  don't assume Next 14 APIs (e.g. no `next/image` config changes, old metadata
  field names like `themeColor` at the top level still work here).
- **`/plans` page is intentionally hidden** from nav and sitemap; keep it that way
  unless asked.
- **Remote images** must be allow-listed in `next.config.mjs` (`images.domains`/
  `remotePatterns`) or `next/image` will throw at runtime.
- The contact form has **no backend** — `handleSubmit` only logs to console.

## Verifying changes

1. `pnpm lint` clean.
2. `pnpm build` succeeds.
3. If blog posts changed: `node scripts/process-blog-posts.mjs` re-run and the
   regenerated `public/blog-posts.json` + `public/rss.xml` committed.
4. Spot-check affected routes in `pnpm dev` (especially `/blog` filters and
   `/services?service=<id>` deep links).

## Pointers

- `README.md` — project overview, stack, quickstart, structure.
- `CHANGELOG.md` — full commit-by-commit history (newest first).
- `architectural-diary/` — how the architecture evolved and key decisions.
- `prompt.md` — one-shot prompt that recreates this site from scratch.
