# ConvertHub — project reference

Canonical sources for this project (do not confuse with parent `C:\Course` repo).

| Item | Value |
|------|--------|
| **GitHub repo** | https://github.com/petrovicniikola-max/convert-hub |
| **GitHub owner** | `petrovicniikola-max` |
| **Local path** | `C:\Course\convert-hub` |
| **Stack** | Astro 6, Tailwind 4, TypeScript, Vitest |
| **Build** | `npm run build` → output `dist/` |
| **Deploy** | Cloudflare Pages (Git integration) |

## Cloudflare Pages settings

| Setting | Value |
|---------|--------|
| Root directory | *(empty — repo root)* |
| Build command | `npm run build` |
| Build output | `dist` |
| Node version | `22` (`NODE_VERSION` env var) |

## URLs (update after deploy)

| Item | Value |
|------|--------|
| Production URL | `https://_____.pages.dev` *(fill in)* |
| `astro.config.mjs` → `site` | must match production URL |
| `src/lib/seo.ts` → `SITE_URL` | must match production URL |
| `public/robots.txt` → Sitemap | must match production URL |

## MVP status

- MVP-0: done
- MVP-1: done (50 converters, 6 categories)
- MVP-2: pending
