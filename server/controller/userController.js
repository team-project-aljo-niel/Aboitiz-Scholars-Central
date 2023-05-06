const User = require('../models/user');
const Scholar = require('../models/scholar');
const jwt = require('jsonwebtoken');
const httpError = require('../models/httpError');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const capitalize = (value) => {
  const result = value[0].toUpperCase() + value.slice(1);
  return `${result}`;
};

const userController = {
  // Endpoint to get all Users
  getAllUsers: async (req, res, next) => {
    try {
      const allUsers = await User.find().populate({
        path: 'scholarData',
        model: 'Scholars',
      });

      res.json(allUsers);
    } catch (error) {
      return next(new httpError('Error getting users', 500));
    }
  },

  // Get current user details
  getCurrentUser: async (req, res, next) => {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );

      const userId = decodedToken.userId;
      const currentUser = await User.findById(userId).populate({
        path: 'scholarData',
        model: 'Scholars',
      });
      if (!currentUser) {
        return next(new httpError('User not found', 404));
      }

      res.json(currentUser);
    } catch (error) {
      console.log(error);
      return next(new httpError('Error getting current user details', 500));
    }
  },

  // Endpoint to change access of user based on Id
  changeAccess: async (req, res, next) => {
    try {
      if (req.body.access) {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
          access: req.body.access,
        });
      } else {
        return next(HttpError('Please designate access level', 400));
      }

      res.status(200).send('User Access changed succesfully');
    } catch (error) {
      return next(new httpError('Error changing user access', 500));
    }
  },

  // Endpoint to change update user password
  changeUserPassword: async (req, res, next) => {
    try {
      const { password, newPassword } = req.body;
      const accessToken = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );

      const userId = decodedToken.userId;
      const currentUser = await User.findById(userId);

      const isPasswordValid = await bcrypt.compare(
        password,
        currentUser.password
      );

      if (!isPasswordValid) {
        return next(new httpError('Invalid username or password', 401));
      }

      // Hash the new password with a salt value
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);

      await User.findByIdAndUpdate(userId, {
        password: hashedNewPassword,
      });

      res.status(200).send('Password changed succesfully');
    } catch (error) {
      console.log(error);
      return next(new httpError('Error changing user password', 500));
    }
  },

  changeUserDetails: async (req, res, next) => {
    try {
      const { firstName, lastName, gender, phone, email } = req.body;
      const accessToken = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );

      // Update user details
      const userId = decodedToken.userId;
      await User.findByIdAndUpdate(userId, {
        firstName: capitalize(firstName),
        lastName: capitalize(lastName),
        gender: capitalize(gender),
        phone,
        email,
      });

      // Check if user is a scholar

      const currentUser = await User.findById(userId);
      console.log(userId);

      if (currentUser.access === 'Scholar') {
        // Find scholarData for the user
        let scholarData = await Scholar.findOne({
          user: userId,
        });

        // If there is no scholarData for user, create one

        if (!scholarData) {
          scholarData = new Scholar({ user: userId });
        }

        scholarData.firstName = capitalize(firstName);
        scholarData.lastName = capitalize(lastName);
        scholarData.gender = capitalize(gender);
        scholarData.phone = phone;
        scholarData.email = email;

        await scholarData.save();

        // update User document with scholarData reference ID
        await User.findByIdAndUpdate(userId, { scholarData: scholarData._id });
      }

      await res.status(200).send('User details change succesfully');
    } catch (error) {
      console.log(error);
      return next(new httpError('Error changing user details', 500));
    }
  },
};

module.exports = userController;
