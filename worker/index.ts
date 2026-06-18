export interface Env {
  ASSETS: Fetcher;
  CONVERTER_ORIGIN?: string;
}

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

async function proxyConverter(request: Request, env: Env, path: string): Promise<Response> {
  const origin = env.CONVERTER_ORIGIN?.replace(/\/$/, '');
  if (!origin) {
    return jsonError('Converter service not configured', 503);
  }

  const target = `${origin}${path}`;
  const headers = new Headers();
  const contentType = request.headers.get('Content-Type');
  if (contentType) headers.set('Content-Type', contentType);

  const response = await fetch(target, {
    method: request.method,
    headers,
    body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      'Content-Type': response.headers.get('Content-Type') ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
      ...(response.headers.get('Content-Disposition')
        ? { 'Content-Disposition': response.headers.get('Content-Disposition')! }
        : {}),
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/health' && request.method === 'GET') {
      return proxyConverter(request, env, '/health');
    }

    if (url.pathname === '/api/convert' && request.method === 'POST') {
      return proxyConverter(request, env, '/convert');
    }

    return env.ASSETS.fetch(request);
  },
};
