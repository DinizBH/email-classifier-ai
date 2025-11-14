# 📧 Email Classifier AI

Um sistema completo (frontend + backend) para **classificação automática de e-mails usando IA**.  
O usuário envia um texto ou PDF, o backend extrai o conteúdo e envia para o modelo da OpenAI, que retorna:

- 🎯 **Categoria** (ex: Orçamento, Entrevista, Administrativo, Improdutivo etc.)
- ✉️ **Resposta sugerida** pronta para copiar
- 📄 **Texto extraído** (útil quando o envio é PDF)

Este projeto foi desenvolvido para prática e demonstração de habilidades em:

- Next.js
- Python
- Deploy em Render + Vercel
- Integração com OpenAI
- FastAPI
- Design com Tailwind e Shadcn

---

## 🚀 Tecnologias Utilizadas

### **Backend – FastAPI**

- Python 3.12
- FastAPI
- pdfplumber
- OpenAI (API oficial)
- CORS Middleware
- Deploy no **Render**

### **Frontend – Next.js**

- React + Next.js
- fetch API para consumo do backend
- Upload de PDF ou texto simples
- Deploy na **Vercel**

---

## 🧠 Como funciona

1. O usuário envia um texto ou PDF pelo frontend.
2. O backend recebe o arquivo e, se for PDF, extrai o texto com pdfplumber.
3. O texto é enviado ao modelo da OpenAI junto com instruções específicas.
4. A IA retorna:
   - Categoria
   - Resposta sugerida
   - Texto analisado
5. O frontend exibe tudo lindamente ao usuário.

---

## 📁 Estrutura do Projeto

/frontend
└─ Next.js app
/backend
├─ main.py
├─ requirements.txt
└─ util/pdf_processing.py

---

## 🔧 Variáveis de Ambiente Necessárias

### No Render (backend)

OPENAI_API_KEY=xxxxxxxx

### Na Vercel (frontend)

NEXT_PUBLIC_BACKEND_URL

---

## ▶️ Como rodar localmente (sem a IA )

### Backend

```bash
pip install -r requirements.txt
uvicorn main:app --reload

npm install
npm run dev
```
