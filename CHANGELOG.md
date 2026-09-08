# Changelog

All notable changes to this project are documented here, newest first.
This project does not cut releases; entries are grouped by date and keyed to commits on `main`.

> **History note (2026-09-08):** the commit messages across the entire history were
> improved via a messages-only history rewrite (tree contents, authors, and dates are
> byte-for-byte unchanged; only commit messages and their resulting hashes changed).
> The changes below reference the **post-rewrite** hashes. A local backup branch
> `backup/pre-docs-20260908` preserves the original chain.

## 2025-02-19

### `200c47c` — feat(blog): add social share images, metadataBase, and restyled header

- Add OpenGraph/Twitter preview images (1200x630 collage) to blog metadata; set `metadataBase` on the root layout so relative OG URLs resolve.
- Restyle the blog listing header into a responsive flex row with a pill-styled RSS link; shrink post card images to `h-48`.
- Refresh RSS `lastBuildDate` and regenerate the service-worker precache manifest.

### `9f468a3` — feat(ui): expand footer service links, hide Plans nav, unify favicon

- Expand footer "Our Services" from 4 to 9 deep links matching service slugs.
- Hide the in-progress Plans page from header navigation and remove it from the sitemap.
- Replace `favicon.ico` with a single `favicon.png` used by app metadata and the PWA manifest; register `/rss.xml` as an RSS alternate.

### `668c49e` — feat(blog): add SEO metadata, reading time, and URL-driven filtering

- Emit JSON-LD `BlogPosting`/`BreadcrumbList` structured data and full article OG/Twitter metadata on post pages, with visible breadcrumbs and category-based fallback images.
- Sync blog listing tag/category/search filters to URL query params (`pushState`/`popstate`); extract a reusable `BlogPostCard`; make filtering case-insensitive.
- Derive excerpts, reading time, and frontmatter defaults in the post-processing script; bump `motion` to 12.4.5.

### `fda1490` — feat(blog): add section metadata and responsive SEO images

- Add `app/blog/metadata.ts` (blog section title/description, OG, Twitter, canonical) and per-post Twitter `summary_large_image` cards with corrected OG image paths.
- Convert blog card, hero, and sidebar images to `fill` layouts with responsive `sizes` and priority hints; enlarge the post hero to 600px.
- Point the RSS feed favicon at `icon-192` and regenerate `rss.xml`/`sw.js`.

### `c71f9b0` — feat(pwa): add offline support, manifest, and image caching

- Squash-merge of PR #3: wrap the Next config with `next-pwa` and `CacheFirst` runtime caching for external, Next-optimized, static, and generic images.
- Ship a web manifest (64/192/512 icons, theme color), generated service worker, `robots.txt`, and a `usePWA` hook that reloads the page when a new service worker takes control.
- Add an `OptimizedImage` wrapper with computed `sizes` and middleware setting immutable `Cache-Control` headers on image requests; rebrand the site title to "Natural Chiropractic Solutions".

### `438c334` — feat(blog): add markdown post pipeline, 11 posts, and RSS feed

- Add `scripts/process-blog-posts.mjs` (runs on `postinstall`): reads `app/blog/posts/*.md` frontmatter and generates `public/blog-posts.json` plus an RSS feed via the `feed` package.
- Add 11 blog posts (sciatica, gua sha, CCSP, infrared sauna, sports chiropractic, and more) with tags, categories, and ~60 images.
- Expand services page data (descriptions, FAQs, related posts); migrate package management from npm to pnpm; switch Header animation to `motion/react`.

## 2025-01-24

### `fceb17c` — chore(assets): add service imagery and homepage collage photo

- Add four photos under `public/images`: chiropractic adjustment, electric acupuncture, exercise, and the homepage `collage.jpg`.

### `e110dd9` — feat(ui): replace placeholder imagery with real photos and hero video

- Add eight service photos (acupuncture, cupping, red light, sauna, TCM, detox, physio, chiropractic) and wire homepage/services pages to them instead of missing placeholder paths.
- Swap the homepage hero image for an autoplaying, muted, looping video with click-to-toggle audio; mark homepage images `loading="eager"`.
- Use `collage.jpg` in the specialized programs section with a larger active-service image.

## 2025-01-21

### `a5779c2` — fix(home): correct "Sport Chiropractic" to "Sports Chiropractic"

- Rename the homepage core services entry so the title matches the "Sports Chiropractic" wording used across the site.

### `1c3b626` — feat(blog): render posts from markdown with search and tag filtering (merge PR #2)

- Merge of PR #2 from `hsingh23/blog`: blog posts move from hardcoded TSX objects to markdown files rendered via `gray-matter` + `remark/remark-html`.
- Add `@tailwindcss/typography` for prose styling; make the blog listing client-side filterable by search, tag, and category.
- Add an interactive testimonial carousel with prev/next controls on the homepage.

### `cea3c49` — build(tailwind): add typography plugin and include .md in content globs

- Add `@tailwindcss/typography` ^0.5.16 as a devDependency and register it in `tailwind.config.ts` so `prose` classes style rendered markdown.
- Extend Tailwind content globs to scan `.md` files.

### `8401b9c` — feat(blog): render posts from markdown and add client-side filtering

- Replace hardcoded blog post objects in `app/blog/[slug]/page.tsx` with markdown files under `app/blog/posts/` parsed by `gray-matter` and rendered via `remark/remark-html`.
- Rewrite the blog listing as a client component with working search, tag, and category filtering plus post card images.
- Add a stateful testimonial carousel to the homepage; add `gray-matter`, `remark`, `remark-html` dependencies.

### `6c92185` — feat(site): add privacy/terms pages, blog pages, and sitemap for v0.2.0 (merge PR #1)

- Merge of PR #1 from `hsingh23/blog`, bumping the site to 0.2.0.
- Add `/privacy` and `/terms` pages and `public/sitemap.xml`; add the blog index and dynamic `app/blog/[slug]` post page.
- Rewrite services and homepage; update footer with real Instagram/Facebook links and query-param service links.

### `212ba90` — refactor(layout): drop duplicate QueryClientProvider from root layout

- Remove the module-level `QueryClient` and inline `QueryClientProvider`; `components/Providers` already wraps children with the query client.

### `ab520e2` — feat(site): add blog, legal pages, sitemap, and refreshed content

- Add a blog index with tag/category filter UI and a dynamic post page rendering two initial posts.
- Add `/privacy` and `/terms` pages and `public/sitemap.xml`; rewrite services page and homepage.
- Update footer social links and switch service links from hash anchors to query params; bump version to 0.2.0.

## 2025-01-19

### `1cdff48` — style(pages): normalize quotes/semicolons and add TS types to forms

- Reformat contact, gallery, and testimonials pages to a consistent double-quote/semicolon style.
- Type the contact form handlers (`ChangeEvent`/`FormEvent`) and gallery image state; add `clsx` and `tailwind-merge` dependencies for upcoming use.

### `0adcd41` — feat(site): implement full marketing site pages, components, theming

- Replace the create-next-app scaffold with the complete clinic website: home, about, blog, booking, contact, gallery, plans, services, and testimonials pages.
- Add Header/Footer/Providers/not-found components, animated hero/stats/services/testimonials sections, Tailwind theming with custom colors, and shadcn/ui scaffolding (`components.json`, `cn` helper).
- Downgrade Next to 13.5.8 (from the scaffold's 14.2.16); add react-query, motion, react-icons, tailwindcss-animate; configure image domains and PostCSS.

### `7c1e4c5` — chore: scaffold project with Create Next App defaults

- Initial repository commit generated by create-next-app: Next.js 14 App Router with TypeScript, ESLint, Tailwind CSS, and Geist local fonts, including the default starter page, layout, and configs.
