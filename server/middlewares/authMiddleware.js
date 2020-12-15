const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/config');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({message: 'No authorization header found'});
  }

  const [, token] = authHeader.split(' ');

  try {
    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch (err) {
    res.status(401).json({message: 'Invalid JWT'});
  }
};
