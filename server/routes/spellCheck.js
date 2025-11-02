const express = require('express');
const spellCheckRoute = express.Router();
const { GoogleGenAI } = require('@google/genai');


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY }); 

if (!GEMINI_API_KEY) {
    console.error('❌ Missing GEMINI_API_KEY. Check your .env file.');
  }
  
// 💡 Handle GET requests for debugging/status check
spellCheckRoute.get('/', (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Spell Check API is running. Send a POST request to this endpoint with a JSON body: { 'text': '...' }",
        methodExpected: "POST",
    });
});

spellCheckRoute.post('/', async(req, res) => {
    // Assuming the user sends the text to be checked in the 'text' field
    const { text } = req.body; 

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ error: 'Invalid or missing text input for spell check.' });
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            config: {
                // System Instruction: Focus strictly on spelling and minor typos
                systemInstruction: "You are a specialized spelling correction tool. Review the user's text and correct any spelling or minor typographical errors without changing grammar or sentence structure. Provide the *corrected* version of the text first. Then, on a new line, provide a short, clear explanation of the main spelling corrections made. Do not add any preamble or conversational elements.",
                temperature: 0.1, // Low temperature for high accuracy/factual tasks
                maxOutputTokens: 500,
            },
            contents: text,
        });

        const fullResponseText = response.text.trim();
        
        // Split the response into corrected text and explanation (assuming the model follows the instruction)
        const parts = fullResponseText.split('\n');
        const correctedText = parts[0].trim();
        const explanation = parts.slice(1).join(' ').trim();

        // Send a structured JSON response
        res.status(200).json({
            originalText: text,
            correctedText: correctedText,
            explanation: explanation.length > 0 ? explanation : "No spelling corrections were required."
        });

    } catch (error) {
        console.error("Gemini API Error in spellCheckRoute:", error.message);
        
        if (error.message && (error.message.includes('API key must be set') || error.message.includes('permission denied'))) {
            return res.status(500).json({ 
                error: "Authentication Failed: The API key is invalid or lacks necessary permissions.",
                details: error.message 
            });
        }
        
        res.status(500).json({ error: "An external service error occurred during spell check." });
    }
});

//exports
module.exports = spellCheckRoute;
