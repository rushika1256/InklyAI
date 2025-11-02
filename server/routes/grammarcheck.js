const express = require('express');
const grammarCheckRoute = express.Router();
const { GoogleGenAI } = require('@google/genai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY }); 

// 💡 NEW: Handle GET requests for debugging/status check
grammarCheckRoute.get('/', (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Grammar Check API is running. Send a POST request to this endpoint with a JSON body: { 'text': '...' }",
        methodExpected: "POST",
    });
});

grammarCheckRoute.post('/', async(req, res) => {
    // Assuming the user sends the text to be checked in the 'text' field
    const { text } = req.body; 

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ error: 'Invalid or missing text input for grammar check.' });
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            config: {
                // System Instruction: Strict, expert role for correction
                systemInstruction: "You are an expert grammar and spelling correction tool. Review the user's text and correct any errors in grammar, syntax, or spelling. Provide the *corrected* version of the text first. Then, on a new line, provide a short, clear explanation of the main corrections made. Do not add any preamble or conversational elements.",
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
            explanation: explanation.length > 0 ? explanation : "No major corrections were required."
        });

    } catch (error) {
        console.error("Gemini API Error in grammarCheckRoute:", error.message);
        
        if (error.message && (error.message.includes('API key must be set') || error.message.includes('permission denied'))) {
            return res.status(500).json({ 
                error: "Authentication Failed: The API key is invalid or lacks necessary permissions.",
                details: error.message 
            });
        }
        
        res.status(500).json({ error: "An external service error occurred during grammar check." });
    }
});

//exports
module.exports = grammarCheckRoute;
