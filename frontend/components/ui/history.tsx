"use client";

import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = JSON.parse(localStorage.getItem("history") || "[]");

      if (Array.isArray(stored)) {
        setHistory(stored);
      } else {
        setHistory([]);
      }
    } catch {
      setHistory([]);
    }
  }, []);

  const clearHistory = () => {
    if (typeof window === "undefined") return;

    localStorage.removeItem("history");
    setHistory([]);
  };

  return (
    <div className="mt-8 p-4 border rounded bg-white dark:bg-neutral-900">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold">Histórico</h3>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-sm text-red-600 hover:underline"
          >
            Limpar histórico
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-neutral-700 dark:text-neutral-400 text-sm">
          Nenhum histórico ainda.
        </p>
      ) : (
        <ul className="space-y-3">
          {history
            .slice()
            .reverse()
            .map((item, index) => {
              const finalText =
                item.extracted_text?.trim() ||
                item.input?.trim() ||
                "(Sem texto)";

              return (
                <li
                  key={index}
                  className="p-3 border rounded bg-neutral-50 dark:bg-neutral-800"
                >
                  <p>
                    <strong>Categoria:</strong> {item.category}
                  </p>

                  <p>
                    <strong>Texto:</strong> {finalText.slice(0, 120) + "..."}
                  </p>

                  {item.suggested_reply && (
                    <p className="mt-2">
                      <strong>Resposta da IA:</strong>{" "}
                      {item.suggested_reply.slice(0, 150) + "..."}
                    </p>
                  )}

                  {item.fileName && (
                    <p>
                      <strong>Arquivo:</strong> {item.fileName}
                    </p>
                  )}

                  <p className="text-xs text-neutral-500 mt-1">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}
