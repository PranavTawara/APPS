const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ Message: 'Access denied!' });

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ Message: 'Invalid token!' });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
