function getPrompt(text) {
  return `Convert this English subtitle into natural Hinglish:\n${text}`;
}

export async function convertWithGemini(apiKey, text) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: getPrompt(text) }]
          }
        ]
      })
    }
  );

  const data = await res.json();

  console.log("GEMINI:", JSON.stringify(data));

  if (!data.candidates) {
    throw new Error("Gemini failed");
  }

  return data.candidates[0].content.parts[0].text;
}

export async function convertText(apiType, apiKey, text) {
  return await convertWithGemini(apiKey, text);
}