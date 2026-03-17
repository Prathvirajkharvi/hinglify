// services/aiService.js

// 🔥 Prompt generator
function getPrompt(text) {
  return `Convert the following English subtitle into natural Hinglish (Hindi + English mix, casual tone). Keep it short and human-like:\n\n"${text}"`;
}

// 🟢 ChatGPT
export async function convertWithChatGPT(apiKey, text) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: getPrompt(text) }
      ]
    })
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || text;
}

// 🔵 Gemini
export async function convertWithGemini(apiKey, text) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
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
  return data.candidates?.[0]?.content?.parts?.[0]?.text || text;
}

// 🎯 Switch
export async function convertText(apiType, apiKey, text) {
  if (apiType === "chatgpt") {
    return await convertWithChatGPT(apiKey, text);
  }

  if (apiType === "gemini") {
    return await convertWithGemini(apiKey, text);
  }

  throw new Error("Invalid API type");
}