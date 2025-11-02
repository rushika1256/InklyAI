
const express = require('express');
const cors = require('cors');

require('dotenv').config();

// Initialize Express
const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ Enable CORS for your React frontend
app.use(cors({
  origin: 'http://localhost:5173',  // your React dev server
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ Import route modules
const analyzeRouter = require('./routes/analyze');
const grammarCheckRoute = require('./routes/grammarCheck');
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
