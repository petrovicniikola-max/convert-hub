# ConvertHub conversion API

Runs as a **Cloudflare Container** (see root `wrangler.toml`). The Worker routes `/api/convert` and `/api/health` to this image.

| Direction | Engine |
|-----------|--------|
| PDF → Word | pdf2docx |
| Word → PDF | LibreOffice headless |

## Local Docker test

```bash
docker compose up --build
curl http://localhost:8080/health
```

## Deploy

Deployed automatically with `npm run deploy` / `wrangler deploy` from the repo root (requires Docker + Cloudflare auth).
