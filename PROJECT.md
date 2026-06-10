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

## Cloudflare deploy settings (GitHub → Workers & Pages UI)

Cloudflare may show a **Worker** setup (with Deploy command) instead of classic Pages.
That works with `wrangler.toml` in this repo — it serves the static `dist/` folder.

| Setting | Value |
|---------|--------|
| Repository | `petrovicniikola-max/convert-hub` |
| Branch | `main` |
| Project name | `convert-hub` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Non-production deploy | `npx wrangler versions upload` |
| Path | `/` |
| Environment variable | `NODE_VERSION` = `22` |
| API token name | `convert-hub-deploy` (any name — auto-created) |

## URLs (update after deploy)

| Item | Value |
|------|--------|
| Production URL | https://convert-hub.petrovicniikola.workers.dev |
| `astro.config.mjs` → `site` | https://convert-hub.petrovicniikola.workers.dev |
| `src/lib/seo.ts` → `SITE_URL` | https://convert-hub.petrovicniikola.workers.dev |
| `public/robots.txt` → Sitemap | https://convert-hub.petrovicniikola.workers.dev/sitemap-index.xml |

## MVP status

- MVP-0: done
- MVP-1: done (50 converters, 6 categories)
- MVP-2: pending
