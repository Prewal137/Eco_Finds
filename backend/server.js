// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');  // Import Sequelize instance
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // React frontend URL
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/api/ping', (req, res) => {
  res.json({ message: "🚀 Backend is running and connected to MySQL!" });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
