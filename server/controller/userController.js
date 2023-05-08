const User = require('../models/user');
const Scholar = require('../models/scholar');
const jwt = require('jsonwebtoken');
const httpError = require('../models/httpError');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const user = require('../models/user');
const HttpError = require('../models/httpError');

const capitalize = (value) => {
  const result = value[0]?.toUpperCase() + value?.slice(1).toLowerCase();
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
      const userId = req.userId;
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
  changeAccountDetails: async (req, res, next) => {
    try {
      const userId = req.userId;
      const currentUser = await User.findById(userId);

      const isPasswordValid = await bcrypt.compare(
        password,
        currentUser.password
      );

      if (!isPasswordValid) {
        return next(new httpError('Invalid username or password', 401));
      }

      const userExists = await User.find({
        _id: { $ne: userId },
        userName: req.body.userName,
      });
      if (userExists.length) {
        return next(new HttpError('Sorry, username is already taken', 400));
      }

      // Hash the new password with a salt value
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);

      await User.findByIdAndUpdate(userId, {
        userName: userName,
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

      const userId = req.userId;
      const currentUser = await User.findById(userId);

      const userExists = await User.find({
        _id: { $ne: userId },
        email: req.body.email,
      });
      if (userExists.length) {
        return next(new HttpError('Sorry, email is already taken', 400));
      }

      // Update user details
      await User.findByIdAndUpdate(userId, {
        firstName: capitalize(firstName) || '',
        lastName: capitalize(lastName) || '',
        gender: capitalize(gender) || '',
        phone: phone || '',
        email: email || '',
      });

      // Check if user is a scholar
      if (currentUser.access === 'Scholar') {
        // Find scholarData for the user
        let scholarData = await Scholar.findByIdAndUpdate(
          currentUser.scholarData,
          {
            firstName: capitalize(firstName) || '',
            lastName: capitalize(lastName) || '',
            gender: capitalize(gender) || '',
            phone: phone || '',
            email: email || '',
          },
          { new: true }
        );
      }

      await res.status(200).send('User details change succesfully');
    } catch (error) {
      console.log(error);
      return next(new httpError('Error changing user details', 500));
    }
  },
};

module.exports = userController;
