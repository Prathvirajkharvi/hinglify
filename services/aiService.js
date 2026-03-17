// services/aiService.js

function getPrompt(text) {
  return `Convert this English subtitle into natural Hinglish (Hindi + English mix, casual tone):\n${text}`;
}

// 🔥 ChatGPT
export async function convertWithChatGPT(apiKey, text) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: getPrompt(text)
        }
      ]
    })
  });

  const data = await res.json();

  console.log("CHATGPT RESPONSE:", data);

  if (!data.choices) {
    throw new Error("ChatGPT API failed: " + JSON.stringify(data));
  }

  return data.choices[0].message.content;
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

  console.log("GEMINI RESPONSE:", data);

  if (!data.candidates) {
    throw new Error("Gemini API failed: " + JSON.stringify(data));
  }

  return data.candidates[0].content.parts[0].text;
}

// 🎯 Main switch
export async function convertText(apiType, apiKey, text) {
  if (apiType === "chatgpt") {
    return await convertWithChatGPT(apiKey, text);
  }

  if (apiType === "gemini") {
    return await convertWithGemini(apiKey, text);
  }

  throw new Error("Invalid API type");
}