// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');  // MySQL connection file

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get('/api/ping', (req, res) => {
    res.json({ message: "🚀 Backend is running and connected to MySQL!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

//.env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=ecofinds


//config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    }
);

sequelize.authenticate()
    .then(() => console.log('✅ MySQL connected...'))
    .catch(err => console.error('❌ DB Error:', err));

module.exports = sequelize;
