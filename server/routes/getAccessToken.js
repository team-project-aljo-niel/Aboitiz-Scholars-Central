const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const HttpError = require('../models/httpError');

router.get('/', async (req, res, next) => {
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

    return res.status(200).json({
      message: 'New access token generated',
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Error generating new acces Token', 500));
  }
});

module.exports = router;
