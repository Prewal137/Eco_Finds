// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // set to true to see SQL queries
  }
);

// Test DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected...');
  } catch (err) {
    console.error('❌ DB Error:', err);
  }
})();

module.exports = sequelize;
