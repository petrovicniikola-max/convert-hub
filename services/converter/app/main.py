import logging
import subprocess
import tempfile
from pathlib import Path

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.responses import Response
from pdf2docx import Converter

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("converter")

app = FastAPI(title="ConvertHub Converter", version="1.0.0")

MAX_BYTES = 25 * 1024 * 1024
WORD_SUFFIXES = {".doc", ".docx", ".odt", ".rtf"}
PDF_SUFFIX = ".pdf"
MIME = {
    "pdf": "application/pdf",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


def _safe_stem(filename: str | None, fallback: str) -> str:
    stem = Path(filename or fallback).stem.strip() or fallback
    return "".join(c for c in stem if c.isalnum() or c in "._- ")[:120] or fallback


@app.post("/convert")
async def convert(
    file: UploadFile = File(...),
    output: str = Form(...),
) -> Response:
    if output not in MIME:
        raise HTTPException(status_code=400, detail="output must be pdf or docx")

    data = await file.read()
    if not data:
        raise HTTPException(status_code=400, detail="Empty file")
    if len(data) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="File exceeds 25 MB limit")

    suffix = Path(file.filename or "").suffix.lower()
    stem = _safe_stem(file.filename, "document")

    with tempfile.TemporaryDirectory(prefix="converthub-") as tmp:
        tmp_path = Path(tmp)
        input_path = tmp_path / f"input{suffix or '.bin'}"
        input_path.write_bytes(data)

        try:
            if output == "pdf":
                if suffix not in WORD_SUFFIXES:
                    raise HTTPException(
                        status_code=400,
                        detail="Word to PDF requires .doc, .docx, .odt, or .rtf",
                    )
                out_path = _word_to_pdf(input_path, tmp_path)
            else:
                if suffix != PDF_SUFFIX:
                    raise HTTPException(status_code=400, detail="PDF to Word requires a .pdf file")
                out_path = _pdf_to_docx(input_path, tmp_path)
        except HTTPException:
            raise
        except Exception as exc:
            logger.exception("Conversion failed")
            raise HTTPException(status_code=500, detail=f"Conversion failed: {exc}") from exc

        if not out_path.exists():
            raise HTTPException(status_code=500, detail="Conversion produced no output")

        body = out_path.read_bytes()
        out_name = f"{stem}.{output}"
        return Response(
            content=body,
            media_type=MIME[output],
            headers={
                "Content-Disposition": f'attachment; filename="{out_name}"',
                "Cache-Control": "no-store",
            },
        )


def _word_to_pdf(input_path: Path, work_dir: Path) -> Path:
    result = subprocess.run(
        [
            "soffice",
            "--headless",
            "--nologo",
            "--nofirststartwizard",
            "--convert-to",
            "pdf",
            "--outdir",
            str(work_dir),
            str(input_path),
        ],
        capture_output=True,
        text=True,
        timeout=120,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or "LibreOffice conversion failed")

    out_path = work_dir / f"{input_path.stem}.pdf"
    if not out_path.exists():
        candidates = list(work_dir.glob("*.pdf"))
        if not candidates:
            raise RuntimeError("LibreOffice did not create a PDF")
        out_path = candidates[0]
    return out_path


def _pdf_to_docx(input_path: Path, work_dir: Path) -> Path:
    out_path = work_dir / f"{input_path.stem}.docx"
    converter = Converter(str(input_path))
    try:
        converter.convert(str(out_path), start=0, end=None)
    finally:
        converter.close()
    return out_path
