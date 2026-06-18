# ConvertHub conversion API

High-fidelity document conversion for production:

| Direction | Engine | Why |
|-----------|--------|-----|
| PDF → Word | [pdf2docx](https://github.com/dothinking/pdf2docx) | Layout-aware rebuild (tables, images, positioning) |
| Word → PDF | LibreOffice headless | Industry-standard DOCX/DOC rendering |

Files are written to a temp directory and deleted when the request ends. Nothing is stored on disk after the response.

## Run locally

```bash
cd services/converter
docker compose up --build
```

Health: `http://localhost:8080/health`

Convert:

```bash
curl -F "file=@sample.pdf" -F "output=docx" http://localhost:8080/convert -o out.docx
```

## Production

1. Deploy this container on any VPS (Hetzner, Fly.io, Railway, your Pi with enough RAM).
2. Put HTTPS in front (Caddy, nginx, or platform ingress).
3. In Cloudflare Workers dashboard, set variable `CONVERTER_ORIGIN` to your API origin, e.g. `https://converter.convert-hub.net`.
4. The site worker proxies `POST /api/convert` → `{CONVERTER_ORIGIN}/convert`.

Recommended: at least **1 GB RAM**, **1 vCPU**.
