const jwt = require('jsonwebtoken');
const HttpError = require('../models/httpError');
const User = require('../models/user');

const maxRetry = 3;

const authChecker = async (req, res, next, retryCount = 0) => {
  try {
    const accessToken = req?.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError' && retryCount < maxRetry) {
      try {
        const refreshToken = req.cookies.refreshToken;

        const decodedToken = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        const user = await User.findById(decodedToken.userId);
        if (!user) {
          throw new Error('User not found');
        }
        const newAccessToken = jwt.sign(
          { userId: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '15m' }
        );
        req.userId = user._id;
        res.setHeader('Authorization', `Bearer ${newAccessToken}`);
        req.headers.authorization = `Bearer ${newAccessToken}`;
        console.log(newAccessToken);
        authChecker(req, res, next, retryCount + 1);
      } catch (error) {
        console.log(error);
        return next(new HttpError('Authentication failed', 401));
      }
    } else {
      console.log(error);
      return next(new HttpError('Authentication failed', 401));
    }
  }
};

module.exports = authChecker;
