export async function convertText(apiKey, text) {

  if (!text || text.length < 2) return text;

  const prompt = `
Convert this English subtitle into natural Hinglish.

Rules:
- Hindi + English mix
- Casual tone
- DO NOT return same sentence
- Make it human style

Example:
"I will protect you" → "Main tumhe protect karunga"

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
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  );

  const data = await res.json();

  console.log("🔥 GEMINI RESPONSE:", JSON.stringify(data));

  if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
    console.error("❌ Gemini failed:", data);
    return text; // fallback
  }

  let output = data.candidates[0].content.parts[0].text.trim();

  // ❗ same output fix
  if (output.toLowerCase() === text.toLowerCase()) {
    output = "👉 " + text;
  }

  return output;
}