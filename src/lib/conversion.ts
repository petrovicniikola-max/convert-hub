export type ConversionMode = 'quality' | 'private';
export type OutputFormat = 'pdf' | 'docx';

export const MAX_FILE_BYTES_QUALITY = 25 * 1024 * 1024;
export const MAX_FILE_BYTES_PRIVATE = 10 * 1024 * 1024;

export function maxBytesForMode(mode: ConversionMode): number {
  return mode === 'quality' ? MAX_FILE_BYTES_QUALITY : MAX_FILE_BYTES_PRIVATE;
}

export async function isQualityModeAvailable(): Promise<boolean> {
  try {
    const response = await fetch('/api/health', { method: 'GET', cache: 'no-store' });
    return response.ok;
  } catch {
    return false;
  }
}
