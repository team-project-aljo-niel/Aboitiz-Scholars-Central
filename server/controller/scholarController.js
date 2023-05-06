const Scholar = require('../models/scholar');
const jwt = require('jsonwebtoken');
const httpError = require('../models/httpError');
const bcrypt = require('bcrypt');

const scholarController = {
  getAllScholars: async (req, res, next) => {
    try {
      const allScholars = await Scholar.find();
      res.json(allScholars);
    } catch (error) {
      console.log(error);
      return next(new httpError('Error getting scholars', 500));
    }
  },

  updateScholarInfo: async (req, res, next) => {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      const userId = decodedToken.userId;
      const currentScholar = await Scholar.findOne({ user: userId });

      // loop through request body and update scholarData

      console.log(req.body);
      for await (const [key, value] of Object.entries(req.body)) {
        currentScholar[key] = value;
      }

      await currentScholar.save();
      res.status(200).send('Scholar info changed succesfully');
    } catch (error) {
      console.log(error);
      return next(new httpError('Error updating scholar details', 500));
    }
  },
};

module.exports = scholarController;
