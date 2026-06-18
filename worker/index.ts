import { Container, getRandom } from '@cloudflare/containers';

export class ConverterContainer extends Container {
  defaultPort = 8080;
  sleepAfter = '5m';
}

export interface Env {
  ASSETS: Fetcher;
  CONVERTER: DurableObjectNamespace<ConverterContainer>;
}

function proxyToConverter(request: Request): Request {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api/, '') || '/';
  return new Request(`http://converter.internal${path}${url.search}`, {
    method: request.method,
    headers: request.headers,
    body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/health' || url.pathname === '/api/convert') {
      try {
        const container = await getRandom(env.CONVERTER, 3);
        return await container.fetch(proxyToConverter(request));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Converter unavailable';
        return new Response(JSON.stringify({ error: message }), {
          status: 503,
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        });
      }
    }

    return env.ASSETS.fetch(request);
  },
};
