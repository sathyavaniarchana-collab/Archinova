import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate-description", async (req, res) => {
  try {
    const { climate, room, style } = req.body;

    if (!climate || !room || !style) {
      return res.status(400).json({
        error: "Missing climate, room or style"
      });
    }

    // 🎯 Strict Prompt Control
   const prompt = `
You are a professional interior architect.

Generate a structured design report for a ${style} ${room} designed for ${climate} climate.

Include ONLY these sections:

1. Color Palette
2. Furniture Style
3. Lighting Design
4. Furniture Arrangement Layout
5. Floor Plan Concept

Rules:
- Maximum 200 words
- Use bullet points
- Keep it professional and clean
- No conclusion
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 250,      // Hard stop limit
        temperature: 0.6     // Less creativity = less rambling
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5500",
          "X-Title": "Archinova AI"
        }
      }
    );

    const aiText = response.data?.choices?.[0]?.message?.content?.trim();

    if (!aiText) {
      return res.json({
        description: "AI could not generate description."
      });
    }

    return res.json({
      description: aiText
    });

  } catch (error) {
    console.error("AI ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      error: "AI description failed"
    });
  }
});

app.listen(5000, () => {
  console.log("🚀 Archinova AI running on http://localhost:5000");
});