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

## Deploy (Cloudflare Workers)

Git push → auto build on Cloudflare. See `PROJECT.md` for settings.

Production URL: **https://convert-hub.net**

## Analytics (Umami Cloud)

In Cloudflare project settings → **Variables**, add:

```
PUBLIC_UMAMI_WEBSITE_ID=a03f020c-6e13-46e9-b656-051e5a34cd0c
```

Redeploy after adding. Script loads only when this variable is set (no tracking in local dev).

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
