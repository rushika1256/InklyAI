
const express = require('express');
const cors = require('cors');

require('dotenv').config();

// Initialize Express
const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ Enable CORS for your React frontend
app.use(cors({
    origin: [
      'http://localhost:5173',                // Local dev
      'https://inkly-ai-delta.vercel.app',    // Vercel production frontend
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));
  

// ✅ Import route modules
const analyzeRouter = require('./routes/analyze');
const grammarCheckRoute = require('./routes/grammarcheck');
const spellCheckRoute = require('./routes/spellCheck');

// ✅ Mount routes
app.use('/api/analyze', analyzeRouter);
app.use('/api/grammar-check', grammarCheckRoute);
app.use('/api/spell-check', spellCheckRoute);

// ✅ Root endpoint
app.get('/', (req, res) => {
  res.send('✅ Server is running. Available endpoints: /api/analyze, /api/grammar-check, /api/spell-check');
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
