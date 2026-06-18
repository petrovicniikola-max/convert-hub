import mammoth from 'mammoth';
import html2pdf from 'html2pdf.js';

export interface WordToPdfResult {
  blob: Blob;
  warnings: string[];
}

export async function convertWordToPdf(arrayBuffer: ArrayBuffer): Promise<WordToPdfResult> {
  const { value: html, messages } = await mammoth.convertToHtml({ arrayBuffer });
  const warnings = messages.map((m) => m.message).filter(Boolean);

  const container = document.createElement('div');
  container.innerHTML = html;
  container.style.cssText =
    'padding:24px;font-family:Georgia,"Times New Roman",serif;font-size:12pt;line-height:1.5;color:#111;';
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = '210mm';
  document.body.appendChild(container);

  try {
    const blob = await html2pdf()
      .set({
        margin: [12, 12, 12, 12],
        filename: 'converted.pdf',
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(container)
      .outputPdf('blob');

    return { blob, warnings };
  } finally {
    document.body.removeChild(container);
  }
}
