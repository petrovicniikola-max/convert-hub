export interface FileTool {
  slug: string;
  title: string;
  description: string;
  accept: string;
  acceptLabel: string;
  outputExt: string;
  relatedSlug: string;
  relatedLabel: string;
}

export const fileTools: FileTool[] = [
  {
    slug: 'word-to-pdf',
    title: 'Word to PDF Converter',
    description:
      'Convert DOCX files to PDF in your browser. Free, private — your document never leaves your device.',
    accept: '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    acceptLabel: 'DOCX',
    outputExt: 'pdf',
    relatedSlug: 'pdf-to-word',
    relatedLabel: 'PDF to Word',
  },
  {
    slug: 'pdf-to-word',
    title: 'PDF to Word Converter',
    description:
      'Convert PDF to editable DOCX in your browser. Extracts text from PDF files — best for text-based documents.',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF',
    outputExt: 'docx',
    relatedSlug: 'word-to-pdf',
    relatedLabel: 'Word to PDF',
  },
];

export function getFileTool(slug: string): FileTool | undefined {
  return fileTools.find((t) => t.slug === slug);
}

export const MAX_FILE_BYTES = 10 * 1024 * 1024;
