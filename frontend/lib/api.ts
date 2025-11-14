"use client";

import { saveHistory } from "@/app/utils/history";

export async function processEmail(data: { text: string; file: File | null }) {
  const formData = new FormData();
  formData.append("text", data.text);

  if (data.file) {
    formData.append("file", data.file);
  }

  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/process-email",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      const errorResult = {
        category: "Erro",
        suggested_reply: "Falha ao conectar ao servidor.",
        raw: "HTTP " + res.status,
      };

      saveHistory({
        input: data.text,
        fileName: data.file?.name || null,
        category: errorResult.category,
        suggested_reply: errorResult.suggested_reply,
        timestamp: new Date().toISOString(),
      });

      return errorResult;
    }

    const result = await res.json();

    saveHistory({
      input: data.text,
      fileName: data.file?.name || null,
      category: result.category,
      suggested_reply: result.suggested_reply,
      extracted_text: result.extracted_text,
      timestamp: new Date().toISOString(),
    });

    return result;
  } catch (err) {
    const fallback = {
      category: "Erro",
      suggested_reply: "Não foi possível conectar ao backend.",
      raw: String(err),
    };

    saveHistory({
      input: data.text,
      fileName: data.file?.name || null,
      category: fallback.category,
      suggested_reply: fallback.suggested_reply,
      timestamp: new Date().toISOString(),
    });

    return fallback;
  }
}
