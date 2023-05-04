const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');
const HttpError = require('../models/httpError');

// Function to check if user parameter already exists

const userExists = async (field, value) => {
  const user = await User.findOne({
    [field]: { $regex: new RegExp(`^${value}$`, 'i') },
  });

  return Boolean(user);
};

// POST SignUp ('/signup')
router.post('/', async (req, res, next) => {
  try {
    const user = new User(req.body);

    // check if user already exists
    if (await userExists('userName', user.userName)) {
      return next(new HttpError('Username already exists', 400));
    } else if (await userExists('email', user.email)) {
      return next(new HttpError('Email already exists', 400));
    }

    // Hash the password with a salt value
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    // pre-assign access role of account to scholar
    user.gender = '';
    user.phone = '';
    user.access = 'scholar';

    await user.save();
    res.status(200).send('User Created');
  } catch (error) {
    console.log(error);
    return next(new HttpError('Failed to create user', 400));
  }
});

module.exports = router;
