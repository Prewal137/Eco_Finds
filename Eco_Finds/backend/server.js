// server.js
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

const db = require('./config/db');  // Import Sequelize instance
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Import models to sync database
require('./models/association');

const app = express();

// Session store configuration
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Next.js frontend URLs
  credentials: true
}));

// Increase body size limits for image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Session middleware
app.use(session({
  key: 'user_session',
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: false, // Set to true in production with HTTPS
    httpOnly: true
  }
}));

// Test route
app.get('/api/ping', (req, res) => {
  res.json({ message: "🚀 Backend is running and connected to MySQL!" });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Sync database tables
db.sync({ alter: true }).then(() => {
  console.log('✅ Database tables synced');
}).catch(err => {
  console.error('❌ Database sync error:', err);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}/api`);
});
