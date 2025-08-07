const fetch = require("node-fetch");
const characterPrompts = require("../utils/prompts");

const chatHandler = async (req, res) => {
  const { message, character, name, description } = req.body;

  const basePrompt = characterPrompts[character];

  const fullPrompt = `
${basePrompt}
You are now chatting with a human from the future named ${name}, who describes themselves as: "${description}".

Human: ${message}
${character}:`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
       headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://your-site.com", // Replace with your actual deployed site
        "X-Title": "AI Time Traveler Chat"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: basePrompt },
          { role: "user", content: message }
        ]
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    res.json({ reply });
  } catch (err) {
    console.error("ChatController Error:", err);
    res.status(500).json({ error: "OpenRouter API request failed." });
  }
};

module.exports = chatHandler;