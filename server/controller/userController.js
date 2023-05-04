const User = require('../models/user');
const Scholars = require('../models/scholar');
const jwt = require('jsonwebtoken');
const httpError = require('../models/httpError');

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

  getCurrentUser: async (req, res) => {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );

      const userId = decodedToken.userId;
      const currentUser = await User.findById(userId);
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
      const updateUser = await User.findByIdAndUpdate(req.params.id, {
        access: req.body.access,
      });

      res.status(200).send('User Access changed succesfully');
    } catch (error) {
      return next(new httpError('Error changing user access', 500));
    }
  },
};

module.exports = userController;
