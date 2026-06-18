import { Document, Packer, Paragraph, TextRun } from 'docx';
import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function extractPdfText(arrayBuffer: ArrayBuffer): Promise<string> {
  const data = new Uint8Array(arrayBuffer);
  const pdf = await pdfjs.getDocument({ data }).promise;
  const parts: string[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (pageText) parts.push(pageText);
  }

  return parts.join('\n\n');
}

export async function convertPdfToWord(arrayBuffer: ArrayBuffer): Promise<Blob> {
  const text = await extractPdfText(arrayBuffer);
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

  const children =
    paragraphs.length > 0
      ? paragraphs.map((p) => new Paragraph({ children: [new TextRun(p.trim())] }))
      : [new Paragraph({ children: [new TextRun('')] })];

  const doc = new Document({
    sections: [{ children }],
  });

  return Packer.toBlob(doc);
}
