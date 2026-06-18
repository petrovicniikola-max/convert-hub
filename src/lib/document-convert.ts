import type { ConversionMode, OutputFormat } from './conversion';
import type { InputFormat } from '@matbee/libreoffice-converter/browser';
import { convertViaApi } from './convert-api';
import { convertWithLibreOffice } from './libreoffice';

export interface ConversionResult {
  blob: Blob;
  warnings: string[];
  engine: 'server' | 'browser';
}

function inputFormatFor(file: File, outputFormat: OutputFormat): InputFormat | undefined {
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (outputFormat === 'pdf') {
    if (ext === 'doc') return 'doc';
    if (ext === 'docx') return 'docx';
    if (ext === 'odt') return 'odt';
    if (ext === 'rtf') return 'rtf';
    return undefined;
  }
  if (ext === 'pdf') return 'pdf';
  return undefined;
}

export async function convertDocumentFile(
  file: File,
  outputFormat: OutputFormat,
  mode: ConversionMode,
): Promise<ConversionResult> {
  if (mode === 'quality') {
    const blob = await convertViaApi(file, outputFormat);
    return { blob, warnings: [], engine: 'server' };
  }

  const buffer = await file.arrayBuffer();
  const inputFormat = inputFormatFor(file, outputFormat);
  const blob = await convertWithLibreOffice(buffer, outputFormat, file.name, inputFormat ? { inputFormat } : undefined);
  return {
    blob,
    warnings: [],
    engine: 'browser',
  };
}
