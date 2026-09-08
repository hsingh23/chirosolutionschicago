# Natural Chiropractic Solutions — chirosolutionschicago

Marketing site and blog for **Dr. Daniel M. Dziekan, DC, CCSP** (Certified Chiropractic
Sports Physician & Mei Zen Cosmetic Acupuncture Practitioner), a chiropractic and
holistic wellness practice in Lincoln Park, Chicago.

**Live site:** https://www.chirosolutionschicago.com

## What this is

A single-site Next.js App Router application presenting the practice online:

- **Marketing pages** — home, about, services, plans, testimonials, gallery, booking, contact, privacy, terms.
- **Services explorer** — 11 services (chiropractic adjustments, Mei Zen cosmetic acupuncture, electric stimulation acupuncture, rehab & physiotherapy, red light therapy, cupping, infrared sauna, therapeutic exercises, TCM, nutrition & detox) with deep links (`/services?service=<id>`), FAQs, and related posts.
- **Markdown blog** — posts authored as `.md` with frontmatter, compiled at install time into `public/blog-posts.json` and `public/rss.xml`; listing with URL-synced search/tag/category filtering; post pages with JSON-LD structured data, reading time, and OG/Twitter cards.
- **PWA** — installable via `next-pwa` (web manifest, service worker, aggressive image caching, auto-reload on SW update).
- **Booking** — Schedulicity widget (`/booking`) plus "Book Now" buttons in the header/footer.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 13.5.8 (App Router) + React 18 + TypeScript |
| Styling | Tailwind CSS 3 + `@tailwindcss/typography` (prose) + `tailwindcss-animate`, shadcn-style CSS variable theme |
| Animation | `motion` (motion/react) |
| Data/state | `@tanstack/react-query` (providers wired, lightly used) |
| Content | `gray-matter` + `remark`/`remark-html` + `feed` (RSS) |
| PWA | `next-pwa` (Workbox, CacheFirst image caching), custom `middleware.ts` cache headers |
| Package manager | pnpm (lockfile committed; `postinstall` regenerates blog JSON/RSS) |

No environment variables are required. The only external services referenced are
Unsplash image CDN domains (`images.unsplash.com`, `apm.info` — allowed in
`next.config.mjs`), the Schedulicity booking widget, and an imgur-hosted hero video.

## Quickstart

```bash
pnpm install   # also runs scripts/process-blog-posts.mjs via postinstall
pnpm dev       # http://localhost:3000
```

Other commands:

```bash
pnpm build     # production build (dev-mode PWA is disabled; prod build emits sw.js)
pnpm start     # serve the production build
pnpm lint      # next lint --fix
```

To add a blog post: drop a `.md` file with frontmatter (`title`, `date`, `tags`,
`category`, `image`) into `app/blog/posts/`, then re-run
`node scripts/process-blog-posts.mjs` (or reinstall) to regenerate
`public/blog-posts.json` and `public/rss.xml`. The listing and RSS read the
generated JSON; post pages read the markdown directly at request time.

## Structure

```
app/
  page.tsx                 # home: hero video, stats, core services, testimonial carousel, FAQ
  about|booking|contact|gallery|plans|privacy|terms|testimonials/page.tsx
  services/page.tsx        # 11-service explorer, ?service=<id> deep links
  blog/
    page.tsx               # listing; consumes public/blog-posts.json; URL-synced filters
    [slug]/page.tsx        # post page: gray-matter + remark, JSON-LD, OG/Twitter metadata
    layout.tsx             # blog shell (sidebar, shared metadata)
    metadata.ts            # blog-section metadata generator
    posts/*.md             # 12 markdown posts (source of truth)
components/                # Header, Footer, Providers, BlogSidebar, OptimizedImage, not-found
app/components/            # older duplicates of Header/Footer/Providers/ScrollToTop (unused)
app/hooks/usePWA.tsx       # service-worker update → auto reload
lib/utils.ts               # cn() class-merge helper
middleware.ts              # immutable Cache-Control for image requests
scripts/process-blog-posts.mjs  # md → blog-posts.json + rss.xml (postinstall)
public/                    # images, manifest.json, sw.js, rss.xml, sitemap.xml, robots.txt
```

## Deployment

Deployed to production at https://www.chirosolutionschicago.com (Vercel-style
`next build`). The production build regenerates the service worker precache;
`public/blog-posts.json` and `public/rss.xml` are committed artifacts — re-run the
postinstall script after changing posts so they stay in sync.

## Notes

- `app/components/*` duplicates the newer `components/*` — the root layout imports
  from `components/`; the `app/components` copies are legacy from the initial build.
- The `/plans` page exists but is hidden from navigation and the sitemap.
- `public/sw.js` and `public/workbox-*.js` are generated files that get rewritten by
  `next-pwa` on each production build.
