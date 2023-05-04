const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// POST login ('/login')
router.post('/', async (req, res) => {
  try {
    const { userName, password } = req.body;

    // check if user exists
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).send('Invalid Username');
    }

    // check if password is correct
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).send('Invalid Password');
    }

    // create Access token

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    // create Refresh token
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET
    );

    // set refreshToken as a httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
    });

    res.status(200).json(accessToken);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error loggin in');
  }
});

// Post request for refreshToken to get a new accesToken

router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    // check if refreshToken exists
    if (!refreshToken) {
      return res.status(401).send('Refresh token not found');
    }

    // verify refreshToken
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // check if user exists

    const user = await User.findOne({ _id: decoded.userId });
    console.log(decoded);
    if (!user) {
      return res.status(401).send('User not found or refresh token revoked');
    }

    // create new accessToken
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    res.status(200).json(accessToken);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error refreshing token');
  }
});

module.exports = router;
