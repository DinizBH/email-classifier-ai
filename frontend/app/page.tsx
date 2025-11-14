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

    const response = await processEmail({ text, file });

    setResult(response);
    setLoading(false);
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
              <CardTitle className="text-lg">Processar Email</CardTitle>
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
                <input
                  type="file"
                  accept=".txt,.pdf"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </div>

              {/* Botões */}
              <div className="flex gap-2">
                <Button onClick={handleProcess} disabled={loading}>
                  {loading ? "Processando..." : "Processar"}
                </Button>
                <Button variant="ghost" onClick={handleClear}>
                  Limpar
                </Button>
              </div>

              {/* Resultados */}
              {result && (
                <div className="mt-6 p-4 border rounded bg-white dark:bg-neutral-900 text-left">
                  <p>
                    <strong>Categoria:</strong> {result.category}
                  </p>
                  <p>
                    <strong>Resposta sugerida:</strong> {result.suggested_reply}
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
