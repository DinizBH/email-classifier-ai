"use client";

export function saveHistory(entry: {
  input: string;
  fileName: string | null;
  category: string;
  suggested_reply: string;
  extracted_text?: string;
  timestamp: string;
}) {
  if (typeof window === "undefined") return;

  const existing = JSON.parse(localStorage.getItem("history") || "[]");
  existing.push(entry);

  localStorage.setItem("history", JSON.stringify(existing));
}

export function loadHistory() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("history") || "[]");
}
