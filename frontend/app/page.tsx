"use client";

import { useState } from "react";
import { processEmail } from "@/lib/api";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleProcess = async () => {
    setLoading(true);

    // Chama a API enviando texto + arquivo
    const response = await processEmail({ text, file });

    setResult(response);
    setLoading(false);
    console.log("Resposta da IA:", response);
  };

  const handleClear = () => {
    setText("");
    setFile(null);
    setResult(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-indigo-500 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-6xl flex-col items-center justify-between py-32 px-16 bg-indigo-400 dark:bg-black sm:items-start">
        <div className="flex flex-col justify-center items-center w-full gap-6 text-center sm:items-start sm:text-left">
          <Card className="w-full justify-center">
            <CardHeader>
              <CardTitle className="text-3xl">
                Processador de Email com IA
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* Textarea */}
              <div className="mb-4">
                <textarea
                  className="w-full p-3 border rounded"
                  rows={6}
                  placeholder="Cole o conteúdo do email aqui"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              {/* Upload */}
              <div className="mb-4">
                <label className="flex items-center justify-center cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white border-2 border-black rounded p-3 max-w-sm transition">
                  📄 Selecionar PDF ou TXT
                  <input
                    type="file"
                    accept="application/pdf,text/plain"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="hidden"
                  />
                </label>

                {file && (
                  <p className="text-sm text-neutral-800 dark:text-neutral-300 mt-2">
                    Arquivo selecionado: <strong>{file.name}</strong>
                  </p>
                )}
              </div>

              {/* Botões */}
              <div className="flex gap-2">
                <Button
                  onClick={handleProcess}
                  disabled={loading}
                  className="transition cursor-pointer"
                >
                  {loading ? "Processando..." : "Processar"}
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleClear}
                  className="border-2 border-black  transition cursor-pointer"
                >
                  Limpar
                </Button>
              </div>

              {/* Resultados */}
              {result && (
                <div className="mt-6 p-4 border rounded bg-white dark:bg-neutral-900 text-left">
                  <p>
                    <strong>Categoria:</strong> {result.category}
                  </p>

                  <p className="mt-2">
                    <strong>Resposta sugerida:</strong> <br />
                    {result.suggested_reply}
                  </p>

                  <p className="mt-2">
                    <strong>Texto extraído:</strong>
                    <br />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      {result.extracted_text}
                    </span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
