// middleware/authMiddleware.js
const authMiddleware = (req, res, next) => {
  // Check if user is logged in via session
  if (req.session && req.session.user) {
    // Add user info to request for easy access in controllers
    req.user = req.session.user;
    next();
  } else {
    res.status(401).json({ error: 'Authentication required' });
  }
};

module.exports = authMiddleware;
