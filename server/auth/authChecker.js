const jwt = require('jsonwebtoken');
const HttpError = require('../models/httpError');
const User = require('../models/user');

const authChecker = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];

    if (accessToken) {
      const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      req.userId = decodedToken.userId;
      next();
    }
  } catch (error) {
    console.log(error);
    return next(new HttpError('Authentication failed', 401));
  }
};

module.exports = authChecker;
