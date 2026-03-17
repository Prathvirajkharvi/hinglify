// services/aiService.js

function getPrompt(text) {
  return `Convert this English subtitle into natural Hinglish (Hindi + English mix, casual tone):\n${text}`;
}

// 🔵 Gemini (FINAL WORKING)
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
            parts: [
              {
                text: getPrompt(text)
              }
            ]
          }
        ]
      })
    }
  );

  const data = await res.json();

  console.log("GEMINI RESPONSE:", JSON.stringify(data));

  if (!data.candidates || !data.candidates[0]) {
    throw new Error("Gemini API failed: " + JSON.stringify(data));
  }

  return data.candidates[0].content.parts[0].text;
}

// 🎯 MAIN FUNCTION
export async function convertText(apiType, apiKey, text) {
  if (apiType === "gemini") {
    return await convertWithGemini(apiKey, text);
  }

  throw new Error("Only Gemini supported");
}