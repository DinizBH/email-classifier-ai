from fastapi import FastAPI, UploadFile, File, Form
import pdfplumber

app = FastAPI()

@app.post("/process-email")
async def process_email(text: str = Form(None), file: UploadFile = File(None)):
    if file:
        if file.filename.endswith(".pdf"):
            with pdfplumber.open(file.file) as pdf:
                pages = [p.extract_text() for p in pdf.pages]
                text = "\n".join(pages)
        else:
            text = (await file.read()).decode("utf-8")

    # retorno temporário
    return {
        "category": "unknown",
        "suggested_reply": "Função de IA ainda não implementada",
        "extracted_text": text[:200]
    }
