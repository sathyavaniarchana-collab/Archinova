export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { climate, room, style, sqft, budget } = req.body;

    if (!climate || !room || !style) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const prompt = `You are a professional interior designer.

Design a ${style} ${room} suitable for ${climate} climate.

Room Size: ${sqft || "standard"} sqft
Budget: Rs.${budget || "medium"}

Return ONLY this format:

Color Palette
- short point
- short point

Furniture Style
- short point
- short point

Flooring & Lighting
- short point
- short point

Rules:
- Maximum 60 words
- Bullet points only
- No explanations
- Focus only on highlights`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://norvex.vercel.app",
        "X-Title": "Norvex AI"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(502).json({ error: "OpenRouter failed", detail: errText });
    }

    const data = await response.json();
    const description =
      data.choices?.[0]?.message?.content?.trim()?.replace(/\n{2,}/g, "\n")
      || "AI description not available.";

    return res.status(200).json({ description });

  } catch (err) {
    return res.status(500).json({ error: "Internal error", detail: err.message });
  }
}
