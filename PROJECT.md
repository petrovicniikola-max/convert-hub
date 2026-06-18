# ConvertHub — project reference

Canonical sources for this project (do not confuse with parent `C:\Course` repo).

| Item | Value |
|------|--------|
| **GitHub repo** | https://github.com/petrovicniikola-max/convert-hub |
| **GitHub owner** | `petrovicniikola-max` |
| **Local path** | `C:\Course\convert-hub` |
| **Stack** | Astro 6, Tailwind 4, TypeScript, Vitest |
| **Build** | `npm run build` → output `dist/` |
| **Deploy** | Cloudflare Workers + Containers (Git integration) |

## Cloudflare deploy settings (GitHub → Workers & Pages UI)

Cloudflare may show a **Worker** setup (with Deploy command) instead of classic Pages.
That works with `wrangler.toml` in this repo — it serves the static `dist/` folder.

| Setting | Value |
|---------|--------|
| Repository | `petrovicniikola-max/convert-hub` |
| Branch | `main` |
| Project name | `convert-hub` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` (builds Docker container image — requires Workers Paid plan) |
| Non-production deploy | `npx wrangler versions upload` |
| Path | `/` |
| Environment variable | `NODE_VERSION` = `22` |
| API token name | `convert-hub-deploy` (any name — auto-created) |

## URLs (update after deploy)

| Item | Value |
|------|--------|
| Production URL | https://convert-hub.net |
| Workers fallback | https://convert-hub.petrovicniikola.workers.dev |
| `astro.config.mjs` → `site` | https://convert-hub.net |
| `src/lib/seo.ts` → `SITE_URL` | https://convert-hub.net |
| `public/robots.txt` → Sitemap | https://convert-hub.net/sitemap-index.xml |

## MVP status

- MVP-0: done
- MVP-1: done (50 converters, 6 categories)
- MVP-2: done (216 converters, 5 guides, 229 pages total)
- **File tools**: Word↔PDF — **Best quality**: pdf2docx + LibreOffice on **Cloudflare Containers** (`/api/convert`). **Private**: LibreOffice WASM in-browser.
- MVP-3: pending (DE + ES)

## File converter API (Cloudflare Containers)

`services/converter/Dockerfile` is deployed as a Cloudflare Container. The Worker routes `/api/health` and `/api/convert` to it.

- Requires **Workers Paid** ($5/mo) for Containers + Durable Objects
- First container deploy can take **several minutes** to provision
- Git push → Cloudflare Builds runs `npm run build` then `npx wrangler deploy` (Docker image build happens in CI)

Private mode (LibreOffice WASM) works without the container.

Umami ID is embedded in `BaseLayout.astro` at build time (`a03f020c-…`). Static Workers do not support runtime env vars on Cloudflare.
