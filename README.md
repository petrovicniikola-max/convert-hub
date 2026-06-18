# ConvertHub

Multilingual unit converter site (long-tail SEO). Built with Astro + Tailwind.

## MVP-2 status

- [x] 216 English conversion pages (`/convert/[slug]`)
- [x] 6 category hubs (`/convert/length`, `/convert/weight`, …)
- [x] 5 guide articles (`/guides/*`)
- [x] Reverse-pair unique content (direction-specific intro + FAQ)
- [x] Umami Cloud analytics (`PUBLIC_UMAMI_WEBSITE_ID` env var)
- [x] Sitemap (`@astrojs/sitemap`) — **229 pages** total
- [x] JSON-LD (WebApplication + FAQ per page)

## Commands

```bash
npm install
npm run dev          # http://localhost:4321
npm test             # Vitest
npm run build        # static output in dist/
npm run generate:pairs  # regenerate conversion-pairs.json from units.json
```

## Deploy (Cloudflare Workers + Containers)

Git push → Cloudflare builds the site and runs `npx wrangler deploy`.

The **Best quality** conversion API runs as a [Cloudflare Container](https://developers.cloudflare.com/containers/) (Docker image with pdf2docx + LibreOffice). The Worker proxies:

- `GET /api/health` → container
- `POST /api/convert` → container
- everything else → static `dist/`

**Requirements:** Workers Paid plan ($5/mo) for Containers. Docker must be available when `wrangler deploy` runs (local deploy or CI with Docker).

```bash
npm run deploy   # build + wrangler deploy (Docker must be running)
```

Private mode still uses LibreOffice WASM in the browser (`public/libreoffice/` copied at build time).

Production URL: **https://convert-hub.net**

## Analytics (Umami Cloud)

Umami website ID is set in `BaseLayout.astro` (public, baked in at build time).

Static-only Cloudflare Workers cannot use runtime environment variables. Optional override for local/preview builds:

```
PUBLIC_UMAMI_WEBSITE_ID=your-id npm run build
```

Set `PUBLIC_UMAMI_WEBSITE_ID=` (empty) to disable tracking in a custom build.

## Bing Webmaster Tools (manual)

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site `https://convert-hub.net`
3. Verify via DNS (same Cloudflare zone) or import from Google Search Console
4. Submit sitemap: `https://convert-hub.net/sitemap-index.xml`

## Project structure

```
data/
  units.json              # unit definitions (6 categories)
  conversion-pairs.json     # 216 published conversion pairs
scripts/
  generate-pairs.mjs      # build all directed pairs from units.json
src/lib/
  convert.ts              # conversion engine
  pairs.ts                # pair helpers + reverse pair
  page-content.ts         # SEO content generation
  guides.ts               # 5 blog/guide articles
src/pages/
  index.astro             # homepage
  convert/[slug].astro    # conversion pages
  convert/[category]/     # category hubs
  guides/                 # guide index + articles
```

## Next (MVP-3 — after approval)

DE + ES locales, hreflang, top 50 pairs × 2 languages.
