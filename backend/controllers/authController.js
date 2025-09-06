const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password_hash: hashedPassword
    });

    res.status(201).json({ message: '✅ User registered', user });
  } catch (err) {
    res.status(500).json({ error: '❌ Registration failed', details: err.message });
  }
};

// Login user with session
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // ✅ Save user in session
    req.session.user = {
      id: user.user_id,
      username: user.username,
      email: user.email
    };

    res.json({ message: '✅ Login successful', user: req.session.user });
  } catch (err) {
    res.status(500).json({ error: '❌ Login failed', details: err.message });
  }
};

// Logout user
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: '❌ Logout failed' });
    res.clearCookie('user_session');
    res.json({ message: '✅ Logged out successfully' });
  });
};

// Check session
exports.checkSession = (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
};
