export async function convertText(apiKey, text) {

  if (!text || text.length < 2) return text;

  const prompt = `
Convert this English sentence into Hinglish (Hindi + English mix).

Example:
I will protect you → Main tumhe protect karunga

Text:
${text}
`;

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
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  );

  const data = await res.json();

  console.log("🔥 GEMINI:", JSON.stringify(data));

  if (!data.candidates) {
    console.error("❌ ERROR:", data);
    return text;
  }

  return data.candidates[0].content.parts[0].text;
}