export async function convertText(apiKey, text) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Convert this English subtitle into natural Hinglish:\n${text}`
              }
            ]
          }
        ]
      })
    }
  );

  const data = await res.json();

  if (!data.candidates || !data.candidates[0]) {
    console.error("Gemini Error:", data);
    return text; // fallback
  }

  return data.candidates[0].content.parts[0].text;
}