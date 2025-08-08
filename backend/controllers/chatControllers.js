const fetch = require("node-fetch");
const characterPrompts = require("../utils/prompts");

const chatHandler = async (req, res) => {
  console.log("=== CHAT HANDLER CALLED ===");
  console.log("Request body:", req.body);
  console.log("API Key exists:", !!process.env.OPENROUTER_API_KEY);

  const { message, character, name, description } = req.body;

  // Check if all required fields are present
  if (!message || !character || !name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const basePrompt = characterPrompts[character];
  console.log("Character prompt found:", !!basePrompt);

  if (!basePrompt) {
    return res.status(400).json({ error: `Unknown character: ${character}` });
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({ error: "OpenRouter API key not configured" });
  }

  try {
    console.log("Making OpenRouter API call...");
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://your-site.com", // Replace with your actual site
        "X-Title": "AI Time Traveler Chat"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: basePrompt },
          { role: "user", content: `Human named ${name} (${description}): ${message}` }
        ],
        max_tokens: 150,
        temperature: 0.7
      }),
    });

    console.log("OpenRouter response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", errorText);
      return res.status(500).json({ error: "OpenRouter API request failed" });
    }

    const data = await response.json();
    console.log("OpenRouter response data:", JSON.stringify(data, null, 2));

    const reply = data.choices?.[0]?.message?.content;
    
    if (!reply) {
      console.error("No reply in OpenRouter response:", data);
      return res.status(500).json({ error: "No reply received from AI" });
    }

    console.log("Sending reply:", reply);
    res.json({ reply: reply.trim() });

  } catch (err) {
    console.error("ChatController Error:", err);
    res.status(500).json({ error: "Internal server error: " + err.message });
  }
};

module.exports = chatHandler;