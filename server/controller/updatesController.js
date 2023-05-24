const Updates = require('../models/updates');
const User = require('../models/user');
const httpError = require('../models/httpError');

const accountUpdatesController = {
  getAllUpdates: async (req, res, next) => {
    try {
      const allUpdates = await Updates.find();
      res.json(allUpdates);
    } catch (error) {
      console.log(error);
      return next(new httpError('Error getting scholars', 500));
    }
  },
  createAccountUpdates: async (req, res, next) => {
    try {
      const userId = req.userId;
      const userDetails = await User.findOne({ _id: userId });
      const isAccountUpdatesPresent = await Updates.findOne({ user: userId });

      if (!isAccountUpdatesPresent) {
        let newAccountUpdates = new Updates({
          user: userId,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
        });

        for (const [key, value] of Object.entries(req.body)) {
          newAccountUpdates[key] = value;
        }

        await newAccountUpdates.save();
        res.status(200).send('Account Updates Request Sent');
      } else {
        return next(
          new httpError('Request for account update already exists', 409)
        );
      }
    } catch (error) {
      console.log(error);
      return next(new httpError('Error creating account updates', 500));
    }
  },

  deteleAccountUpdates: async (req, res, next) => {
    try {
      const userId = req.params.id;
      await Updates.findOneAndDelete({
        user: userId,
      });
      res.status(200).send('Account Update deleted');
    } catch (error) {
      console.log(error);
      return next(new httpError('Error deleting account updates', 500));
    }
  },
};

module.exports = accountUpdatesController;
