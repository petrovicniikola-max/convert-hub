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
      'Convert Word documents to PDF with professional layout fidelity. LibreOffice server engine — tables, images, and fonts preserved.',
    accept:
      '.doc,.docx,.odt,.rtf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    acceptLabel: 'Word',
    outputExt: 'pdf',
    relatedSlug: 'pdf-to-word',
    relatedLabel: 'PDF to Word',
  },
  {
    slug: 'pdf-to-word',
    title: 'PDF to Word Converter',
    description:
      'Convert PDF to editable DOCX while keeping layout, tables, and images. Powered by pdf2docx — built for faithful PDF reconstruction.',
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
