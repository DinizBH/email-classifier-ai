"use client";

import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(data.reverse()); // mais recente primeiro
  }, []);

  if (history.length === 0) {
    return <p className="text-gray-400 mt-4">Nenhum histórico ainda.</p>;
  }

  return (
    <div className="mt-6 border rounded p-4 bg-gray-100 shadow">
      <h2 className="text-xl font-bold mb-4">Histórico de Processamento</h2>

      {history.map((h, index) => (
        <div key={index} className="border-b py-3">
          <p>
            <strong>Categoria:</strong> {h.category}
          </p>
          <p>
            <strong>Arquivo:</strong> {h.fileName || "Nenhum arquivo"}
          </p>
          <p>
            <strong>Input:</strong> {h.input.slice(0, 80)}...
          </p>
          <p>
            <strong>Resposta:</strong> {h.answer.slice(0, 100)}...
          </p>
          <p className="text-sm text-gray-500">
            {new Date(h.timestamp).toLocaleString()}
          </p>
          <button
            onClick={() => {
              localStorage.removeItem("history");
              location.reload();
            }}
            className="mt-3 px-3 py-2 bg-red-300 text-black rounded"
          >
            Limpar Histórico
          </button>
        </div>
      ))}
    </div>
  );
}
