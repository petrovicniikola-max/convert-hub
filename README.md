# ConvertHub

Multilingual unit converter site (long-tail SEO). Built with Astro + Tailwind.

## MVP-1 status

- [x] 50 English conversion pages (`/convert/[slug]`)
- [x] 6 category hubs (`/convert/length`, `/convert/weight`, …)
- [x] Homepage with categories + popular converters
- [x] Dynamic page content (intro, formula, tables, FAQ, related links)
- [x] Bidirectional converter widget with swap
- [x] Sitemap (`@astrojs/sitemap`)
- [x] JSON-LD (WebApplication + FAQ per page)

## Commands

```bash
npm install
npm run dev      # http://localhost:4321
npm test         # Vitest
npm run build    # static output in dist/
npm run preview  # preview production build
```

## Deploy (Cloudflare Pages)

1. Push repo to GitHub
2. Cloudflare Pages → Connect repo → root directory: `convert-hub`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set custom domain and update `site` in `astro.config.mjs`

## Project structure

```
data/
  units.json              # unit definitions (6 categories)
  conversion-pairs.json   # 50 published conversion pairs
src/lib/
  convert.ts              # conversion engine
  pairs.ts                # pair helpers
  page-content.ts         # SEO content generation
  categories.ts           # category metadata
src/pages/
  index.astro             # homepage
  convert/[slug].astro    # conversion pages
  convert/[category]/     # category hubs
```

## Next (MVP-2 — after approval)

200+ EN pages, blog guides, analytics, Core Web Vitals audit.
