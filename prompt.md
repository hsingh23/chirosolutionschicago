# prompt.md — one-shot recreation prompt

Feed this entire document to a capable coding agent to recreate the
chirosolutionschicago site from scratch in a single pass.

---

Build the marketing website and blog for **Natural Chiropractic Solutions**, the
Chicago practice of **Dr. Daniel M. Dziekan, DC, CCSP** (Certified Chiropractic
Sports Physician & Mei Zen Cosmetic Acupuncture Practitioner). Production URL:
https://www.chirosolutionschicago.com.

## 1. Goal and tone

A conversion-focused marketing site for a local wellness practice: establish
credibility (credentials, stats, testimonials), explain 11 services, publish
SEO-oriented blog articles, and drive visitors to book via Schedulicity.

**Copy tone**: warm, professional, premium ("luxury chiropractic and holistic
wellness"), benefit-led. Speak to athletes, beauty/anti-aging seekers, and chronic
pain patients alike. Example hero: headline "Enhance Wellness with Tailored
Treatments", subhead "Experience comprehensive chiropractic and holistic wellness
in the heart of Chicago with Dr. Daniel M. Dziekan".

## 2. Stack (exact)

- Next.js **13.5.8** App Router (pin exact), React 18.3, TypeScript, ESLint
  (`eslint-config-next` 13.5.8).
- Tailwind CSS 3.4 + `tailwindcss-animate` + `@tailwindcss/typography`; shadcn-style
  HSL CSS-variable theme in `globals.css` mapped in `tailwind.config.ts` (background,
  foreground, card, popover, primary, secondary, muted, accent, destructive, border,
  input, ring, chart-1..5, radius); `cn()` helper in `lib/utils.ts` (clsx +
  tailwind-merge); `components.json` for shadcn tooling.
- `motion` (^12, imported from `motion/react`) for animation.
- `@tanstack/react-query` ^5 — global `QueryClientProvider` via a `Providers`
  component (queries not required; wire the provider only).
- Content: `gray-matter`, `remark`, `remark-html`, `feed`.
- PWA: `next-pwa` ^5.6.
- Package manager **pnpm**; `postinstall` runs `node scripts/process-blog-posts.mjs`.
- Font: Google **Inter** via `next/font` (subsets latin).

## 3. Phased build order

### Phase A — Scaffold and theme

create-next-app equivalent (App Router, TS, Tailwind, ESLint), then: swap in the
theme tokens, `lib/utils.ts`, `components.json`; create root layout
`app/layout.tsx` with Inter, global metadata (see SEO section), `Providers` >
`Header` > `<main>{children}</main>` > `Footer`; add PWA `viewport` meta
(`maximumScale: 1`, `format-detection telephone=no`).

### Phase B — Marketing pages (all client components)

Routes: `/`, `/about`, `/services`, `/plans`, `/testimonials`, `/gallery`,
`/booking`, `/contact`, `/privacy`, `/terms`, plus `not-found`.

**Header** (fixed, `bg-white/90 backdrop-blur-sm shadow-md`): brand text
"Natural Chiropractic Solutions" linking home; desktop nav Home, About, Services,
Blog, Contact (Plans exists in the array with `hidden: true`); blue `Book Now`
pill (FaCalendar icon) linking to Schedulicity in a new tab; mobile hamburger with
motion-animated dropdown.

**Footer** (`bg-gray-900 text-gray-300`): brand blurb + Instagram
(@chirochicago) and Facebook (/chirosolutionschicago) icons; "Our Services" column
with 9 deep links `/services?service=<id>`; Quick Links (About, Plans, FAQ
`/#faq`, Book Appointment); contact block — 2534 N. Halsted St., Chicago, IL
60614, tel 773-529-6530, chirosolutionschicago@gmail.com; bottom bar Privacy and
Terms.

**Homepage sections** (top to bottom):
1. Hero: parallax scroll container (`useScroll`/`useTransform`), staggered fade-up
   text (headline + subhead above), CTA buttons, and an **autoplaying muted
   looping video** (click toggles mute) instead of a static image.
2. Stats band: 2100+ Satisfied Clients, 16+ Years of Experience, 93% Client
   Retention, 4.9/5 Average Review.
3. Core services cards (3): Sports Chiropractic, Cosmetic Acupuncture, Electric
   Stimulation Acupuncture — image, title, description, "Learn more" chevron.
4. Testimonial **carousel** (prev/next chevrons, star ratings, 6 quotes from
   named patients about Mei Zen, sports recovery, red light, cupping, sauna,
   chronic back pain).
5. Specialized programs grid (4): Sports Medicine & Rehabilitation; Cosmetic &
   Anti-Aging Solutions; Wellness Maintenance Plans; "One Stop Shop" — beside a
   collage image.
6. Final CTA band.

**Services page**: sidebar list of all 11 services; clicking selects and pushes
`?service=<id>`; on load, `useSearchParams` preselects. Each service shows long
description, benefits, FAQ accordion, complementary services, related blog posts.

The 11 services (id → name): chiropractic-adjustments → Chiropractic
Adjustments; cosmetic-acupuncture → Cosmetic Acupuncture (Mei Zen);
electric-stimulation-acupuncture → Electric Stimulation Acupuncture;
rehab-physiotherapy → Rehab & Physiotherapy; red-light-therapy → Red Light
Therapy; cupping → Cupping Therapy (fire cupping + mark-free mobile cupping);
infrared-sauna → Infrared Sauna; therapeutic-exercises → Therapeutic Exercises;
tcm → Traditional Chinese Medicine (TCM); nutrition-detox → Nutrition &
Detoxification Programs.

**Plans page** (exists but HIDDEN from nav and sitemap): Essential Care $149,
Comprehensive Wellness $299 (marked popular), Premium Rejuvenation $499, plus
memberships Monthly Wellness $199/mo and Beauty & Wellness $299/mo — feature
checklists each.

**About**: "Meet Dr. Daniel M. Dziekan, DC, CCSP" — portrait, credentials list
(DC, CCSP, Mei Zen practitioner), philosophy paragraph.

**Testimonials**: grid of the same 6 quotes. **Gallery**: before/after image
pairs per treatment with lightbox index state. **Booking**: loads the
Schedulicity widget (`https://www.schedulicity.com/scheduling/NCST6P/widget.js`,
container id `SCHED_NCST6P`) via both a `useEffect` script append and a
`next/script` `lazyOnload` tag. **Contact**: info cards + form (name/email/message)
that validates and logs client-side only (no backend). **Privacy/Terms**: static
legal copy.

### Phase C — Blog content pipeline

- `app/blog/posts/*.md` — source of truth, YAML frontmatter: `title`, `date`
  (YYYY-MM-DD), `tags` (list), `category`, `image` (`/images/blog/...`). Ship 12
  posts: acupuncture-digestive-health, biotics-detoxification-program,
  can-a-chiropractor-help-with-sciatica, does-facial-gua-sha-actually-work,
  far-infrared-sauna-benefits, new-years-specials,
  summer-detox-weight-loss-program, tempo-smart-gym,
  what-does-a-sports-chiropractor-do, what-does-gua-sha-do,
  what-is-ccsp-certification, why-does-spinal-gua-sha-work.
- `scripts/process-blog-posts.mjs` (runs on `postinstall`): parse frontmatter;
  compute `excerpt` (frontmatter or first paragraph, ≤160 chars, stripped of
  `#*\``), `readingTime` (ceil(words/200)), `wordCount`; default `author` to
  "Dr. Daniel M. Dziekan", `category` to "Wellness", `tags` to [], `date` to
  today; slug = filename minus extension; sort newest-first; write
  `public/blog-posts.json` and `public/rss.xml` via `feed` (channel: "Dr. Daniel
  M. Dziekan's Blog", link https://www.chirosolutionschicago.com/blog, items
  carry category + tags).
- Blog listing `app/blog/page.tsx` (client): imports the JSON; search box, tag
  chips, category chips — all synced to `?q=&tag=&category=` via
  pushState/popstate, case-insensitive search, post cards with image/date/
  reading-time/tag chips.
- Post page `app/blog/[slug]/page.tsx` (server): `gray-matter` + `remark`/
  `remark-html` into a `prose` container; hero image (600px) with `priority`;
  visible breadcrumbs; `BlogSidebar` with search and related posts; 404 via
  `notFound()` when slug missing.
- `app/blog/layout.tsx` + `app/blog/metadata.ts`: blog shell and section metadata
  derived from the JSON (counts, categories, tags).

### Phase D — SEO metadata layer

- Root `metadataBase: new URL('https://www.chirosolutionschicago.com')`; title
  "Natural Chiropractic Solutions - Daniel M. Dziekan, DC, CCSP - Luxury
  Chiropractic and Holistic Wellness in Chicago".
- Per-post `generateMetadata`: OG + Twitter `summary_large_image`, canonical
  `https://www.chirosolutionschicago.com/blog/<slug>`, authors, keywords from
  tags, description from excerpt/first paragraph; JSON-LD `BlogPosting` +
  `BreadcrumbList` scripts; OG image = frontmatter image with category-based
  fallback.
- OG share image 1200x630 (`/images/collage.jpg`) on the blog section;
  `alternates: { types: { 'application/rss+xml': '/rss.xml' } }`.
- Committed `public/sitemap.xml` (exclude hidden `/plans`) and `public/robots.txt`.

### Phase E — PWA and image delivery

- `next.config.mjs` wrapped with `withPWA` (dest `public`, register, skipWaiting,
  disabled in dev) and `images` config: domains/remotePatterns
  `images.unsplash.com` + `apm.info`, webp output, `dangerouslyAllowSVG` with
  CSP, tuned `deviceSizes`/`imageSizes`, `minimumCacheTTL: 60`.
- Four `CacheFirst` runtime caches (external images 50/30d, `/_next/image`
  100/7d, `/images/*` 100/30d, any image ext 50/30d).
- `public/manifest.json`: name "Natural Chiropractic Solutions", icons 64/192/512,
  theme `#bccd30`, standalone.
- `app/hooks/usePWA.tsx`: on `navigator.serviceWorker.ready`, listen for
  `controlling` → `window.location.reload()`; call `registration.update()`.
- `middleware.ts`: images and `/_next/image` get
  `Cache-Control: public, max-age=31536000, immutable`.
- `components/OptimizedImage.tsx`: `next/image` wrapper computing `sizes` from a
  `maxWidth` prop, `loading` lazy/eager switch.

## 4. Design system summary

- **Colors**: white surfaces, gray-900 text/gray-600 secondary; CTA and active
  states Tailwind **blue-600/blue-700**; footer gray-900 with gray-300 text;
  soft purple-tinted hero gradient (`from-purple-50 to-white`); PWA theme color
  `#bccd30` (lime). shadcn HSL tokens defined but the pages mostly use stock
  Tailwind palette classes.
- **Type**: Inter everywhere; headings bold 3xl–6xl, body gray-600.
- **Shape/motion**: rounded-lg cards, backdrop-blur sticky header, pill buttons,
  motion fade-up staggers, parallax hero, animated mobile menu and testimonial
  carousel.
- **Imagery**: real Unsplash-style stock photography for every service and post
  (local under `public/images` and `public/images/blog`), plus the autoplaying
  hero video.

## 5. Data model

- **BlogPost** (frontmatter + computed): `title`, `date`, `image?`, `excerpt`,
  `author`, `tags: string[]`, `category`, `slug`, `content` (markdown),
  `readingTime` (minutes), `wordCount`.
- **Service**: `id`, `name`, `description`, `longDescription`, `benefits[]`,
  `faqs: {question, answer}[]`, `complementaryServices[]`,
  `relatedBlogPosts: {title, slug}[]` — hardcoded array in the services page.
- **Plans**: `name`, `price` (string), `description`, `features[]`, `popular`.
- **Testimonial**: `name`, `text`, `rating` (1–5). **Stats**: `{value, label}`.
- No database, no API routes, no environment variables. External "APIs" by name:
  **Schedulicity** widget (ID `NCST6P`), **next/font Google Inter**, remote image
  hosts `images.unsplash.com` / `apm.info`.

## 6. Acceptance criteria

1. `pnpm install` succeeds and regenerates `public/blog-posts.json` + `public/rss.xml`
   from the markdown posts (sorted newest-first, correct reading times).
2. `pnpm build` passes lint/TS; `pnpm dev` serves every route without console errors.
3. All 11 services reachable; `/services?service=cupping` deep-links and
   preselects cupping with the URL updated.
4. Blog: filtering by tag/category/search updates the URL; reloading restores the
   filter; unknown slug renders 404; post page shows hero image, breadcrumbs,
   prose-styled body, reading time, sidebar with related posts.
5. View-source of a post page contains JSON-LD BlogPosting, canonical link, and
   OG/Twitter meta with a share image; `/rss.xml` is valid RSS with 12 items.
6. Production build emits `public/sw.js` + workbox file; `/manifest.json` served;
   image responses carry immutable Cache-Control (middleware).
7. Header shows Book Now → Schedulicity (new tab); footer lists 9 service deep
   links, address, phone, email, socials; `/plans` absent from nav and sitemap.
8. No secrets committed; no environment variables required.

## 7. Known quirks to preserve (or consciously fix)

- `app/components/*` duplicates `components/*`; only `components/` is imported by
  the layout.
- Footer links to `/#faq` but the homepage has no FAQ anchor.
- Contact form logs to console only. Hero video is hosted on imgur.
