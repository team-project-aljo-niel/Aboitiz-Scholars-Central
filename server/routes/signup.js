const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

// Function to check if user parameter already exists

const userExists = async (field, value) => {
  const user = await User.findOne({ [field]: value });
  return Boolean(user);
};

// POST SignUp ('/signup')
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);

    // check if user already exists
    if (await userExists('userName', user.userName)) {
      return res.status(400).send('userName already exists');
    } else if (await userExists('email', user.email)) {
      return res.status(400).send('email already exists');
    }

    // Hash the password with a salt value
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    // pre-assign access role of account to scholar
    user.access = 'scholar';

    await user.save();
    res.status(200).send('User Created');
  } catch (error) {
    console.log(error);
    res.status(400).send('Failed to create User, Please fill up all fields');
  }
});

module.exports = router;
