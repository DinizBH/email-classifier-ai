export async function processEmail(data: { text: string; file: File | null }) {
  const formData = new FormData();
  formData.append("text", data.text);
  if (data.file) formData.append("file", data.file);

  const res = await fetch(
    "https://email-classifier-ai-49kp.onrender.com/process-email",
    {
      method: "POST",
      body: formData,
    }
  );

  return res.json();
}
