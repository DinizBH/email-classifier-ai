from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
from openai import OpenAI
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "https://email-classifier-ai-omega.vercel.app",
],    # você pode trocar para o domínio da vercel depois
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.post("/process-email")
async def process_email(text: str = Form(None), file: UploadFile = File(None)):
    if file:
        if file.filename.endswith(".pdf"):
            with pdfplumber.open(file.file) as pdf:
                pages = [p.extract_text() for p in pdf.pages]
                text = "\n".join(pages)
        else:
            text = (await file.read()).decode("utf-8")

    prompt = f"""
    Analise o e-mail abaixo e responda em JSON válido:

    EMAIL:
    {text}

    O JSON deve conter:
    {{
      "category": "Produtivo" ou "Improdutivo",
      "suggested_reply": "Texto da resposta automática"
    }}
    """

    rsp = client.chat.completions.create(
        model="gpt-4o-mini",  
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )

    ai_text = rsp.choices[0].message.content

    try:
        ai_json = json.loads(ai_text)
    except:
        ai_json = {
            "category": "Erro",
            "suggested_reply": "A IA não retornou JSON válido.",
            "raw": ai_text
        }

    ai_json["extracted_text"] = text[:300]

    return ai_json
