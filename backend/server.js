const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  credentials: true
}));
app.use(express.json());

// ✅ MySQL session store
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

app.use(session({
  key: 'user_session',
  secret: 'super_secret_key', // change this to something strong
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

// ✅ Test route
app.get('/api/ping', (req, res) => {
  res.json({ message: "🚀 Backend is running and connected to MySQL!" });
});

// ✅ Auth routes
app.use('/api/auth', authRoutes);

// ✅ Sync database
db.sync()
  .then(() => console.log("✅ Database synced"))
  .catch(err => console.error("❌ DB Sync error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
