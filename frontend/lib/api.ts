export async function processEmail(input: {
  text?: string;
  file?: File | null;
}) {
  const formData = new FormData();

  if (input.text) formData.append("text", input.text);
  if (input.file) formData.append("file", input.file);

  const res = await fetch(
    "https://email-classifier-ai-49kp.onrender.com/process-email",
    {
      method: "POST",
      body: formData,
    }
  );

  return res.json();
}
