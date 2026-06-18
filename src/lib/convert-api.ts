import type { OutputFormat } from './conversion';

export async function convertViaApi(file: File, outputFormat: OutputFormat): Promise<Blob> {
  const form = new FormData();
  form.append('file', file);
  form.append('output', outputFormat);

  const response = await fetch('/api/convert', {
    method: 'POST',
    body: form,
    cache: 'no-store',
  });

  if (!response.ok) {
    let message = 'Server conversion failed.';
    try {
      const data = (await response.json()) as { detail?: string; error?: string };
      message = data.detail ?? data.error ?? message;
    } catch {
      message = (await response.text()) || message;
    }
    throw new Error(message);
  }

  return response.blob();
}
