from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
from openai import OpenAI
import json
import os
import re

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

def extract_json(text):
    cleaned = re.sub(r"```.*?\n", "", text)
    cleaned = cleaned.replace("```", "").strip()
    return cleaned

@app.post("/process-email")
async def process_email(text: str = Form(None), file: UploadFile = File(None)):
    if file:
        if file.filename.endswith(".pdf"):
            with pdfplumber.open(file.file) as pdf:
                pages = [p.extract_text() for p in pdf.pages]
                text = "\n".join(pages)
        else:
            text = (await file.read()).decode("utf-8")

    system_prompt = """
    Você é um classificador de e-mails. 
    Responda **apenas** com JSON válido, sem markdown, sem blocos de código.
    """

    user_prompt = f"""
    Analise o e-mail abaixo e responda *apenas* o JSON.

    EMAIL:
    {text}

    O JSON deve ser exatamente assim:

    {{
      "category": "Produtivo" ou "Improdutivo",
      "suggested_reply": "Resposta automática profissional"
    }}
    """

    rsp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.3
    )

    ai_text = rsp.choices[0].message.content
    ai_text_clean = extract_json(ai_text)

    try:
        ai_json = json.loads(ai_text_clean)
    except Exception:
        ai_json = {
            "category": "Erro",
            "suggested_reply": "A IA não retornou JSON válido.",
            "raw": ai_text
        }

    ai_json["extracted_text"] = text[:300]

    return ai_json