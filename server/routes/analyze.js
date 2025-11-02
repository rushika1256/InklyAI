const express = require("express");
const analyzeRouter = express.Router();
const { GoogleGenAI } = require("@google/genai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

analyzeRouter.post("/", async (req, res) => {
  const { sentence } = req.body;

  if (!sentence || typeof sentence !== "string" || sentence.trim().length === 0) {
    return res.status(400).json({ error: "Invalid or missing sentence input." });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Give only and only one way in which the sentence can be rephrased. Return grammatically correct versions(most important). 
              Do not add anything else.
              Sentence: "${sentence}"`
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 200,
      },
    });

    const rawText = response.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!rawText.trim()) {
      return res.status(200).json({ rephrasedSentences: ["No valid text returned. Try again."] });
    }

    // 🧠 Extract exactly 3 numbered rephrased lines
    const matches = rawText.match(/\d+\.\s*(.+?)(?=\n\d+\.|$)/gs);
    const rephrasedSentences = matches
      ? matches.map((m) => m.replace(/^\d+\.\s*/, "").trim()).slice(0, 3)
      : rawText.split(/[.!?]\s+/).filter(Boolean).slice(0, 3);

    res.status(200).json({ rephrasedSentences });

  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({
      error: "Error while generating rephrased sentences.",
      details: error.message,
    });
  }
});

module.exports = analyzeRouter;
