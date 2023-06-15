// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed'
    });
  }

  try {
    const decodedToken = jwt.verify(token, 'CARRERCRAVE');
    req.user = {
      userId: decodedToken.userId
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};