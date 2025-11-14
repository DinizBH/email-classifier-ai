"use client";

import { useEffect, useState } from "react";
import { saveHistory } from "@/app/utils/history";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = JSON.parse(localStorage.getItem("history") || "[]");

      // Garante que NUNCA será undefined
      if (Array.isArray(stored)) {
        setHistory(stored);
      } else {
        setHistory([]);
      }
    } catch {
      setHistory([]);
    }
  }, []);

  return (
    <div className="mt-8 p-4 border rounded bg-white dark:bg-neutral-900">
      <h3 className="text-xl font-semibold mb-3">Histórico</h3>

      {history.length === 0 ? (
        <p className="text-neutral-700 dark:text-neutral-400 text-sm">
          Nenhum histórico ainda.
        </p>
      ) : (
        <ul className="space-y-3">
          {history
            .slice()
            .reverse()
            .map((item, index) => (
              <li
                key={index}
                className="p-3 border rounded bg-neutral-50 dark:bg-neutral-800"
              >
                <p>
                  <strong>Categoria:</strong> {item.category}
                </p>
                <p>
                  <strong>Entrada:</strong>{" "}
                  {item.input ? item.input.slice(0, 120) + "..." : "(vazio)"}
                </p>
                {item.fileName && (
                  <p>
                    <strong>Arquivo:</strong> {item.fileName}
                  </p>
                )}

                <p className="text-xs text-neutral-500 mt-1">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
