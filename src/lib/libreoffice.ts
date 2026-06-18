import {
  WorkerBrowserConverter,
  createWasmPaths,
  type ConversionOptions,
  type OutputFormat,
  type WasmLoadProgress,
} from '@matbee/libreoffice-converter/browser';

export type { WasmLoadProgress };

let converter: WorkerBrowserConverter | null = null;
let initPromise: Promise<WorkerBrowserConverter> | null = null;
let progressHandler: ((progress: WasmLoadProgress) => void) | null = null;

export function isCrossOriginIsolated(): boolean {
  return typeof window !== 'undefined' && window.crossOriginIsolated === true;
}

export function setLibreOfficeProgressHandler(handler: ((progress: WasmLoadProgress) => void) | null) {
  progressHandler = handler;
}

export async function getLibreOfficeConverter(): Promise<WorkerBrowserConverter> {
  if (!isCrossOriginIsolated()) {
    throw new Error(
      'This converter needs a secure browser context. Reload the page or try another browser.',
    );
  }

  if (converter?.isReady()) return converter;

  if (!initPromise) {
    initPromise = (async () => {
      const instance = new WorkerBrowserConverter({
        ...createWasmPaths('/libreoffice/wasm/'),
        browserWorkerJs: '/libreoffice/dist/browser.worker.js',
        onProgress: (progress) => progressHandler?.(progress),
      });
      await instance.initialize();
      converter = instance;
      return instance;
    })().catch((err) => {
      initPromise = null;
      throw err;
    });
  }

  return initPromise;
}

export async function convertWithLibreOffice(
  arrayBuffer: ArrayBuffer,
  outputFormat: OutputFormat,
  filename: string,
  options?: Pick<ConversionOptions, 'inputFormat'>,
): Promise<Blob> {
  const conv = await getLibreOfficeConverter();
  const result = await conv.convert(
    new Uint8Array(arrayBuffer),
    { outputFormat, ...options },
    filename,
  );
  return new Blob([result.data], { type: result.mimeType });
}
