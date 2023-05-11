const Scholar = require('../models/scholar');
const User = require('../models/user');
const Grades = require('../models/grades');
const jwt = require('jsonwebtoken');
const httpError = require('../models/httpError');
const bcrypt = require('bcrypt');

const gradesController = {
  getAllGrades: async (req, res, next) => {
    try {
      const allGrades = await Grades.find();

      res.json(allGrades);
    } catch (error) {
      console.log(error);
      return next(new httpError('Error getting all grades'));
    }
  },
  createScholarGrades: async (req, res, next) => {
    try {
      const isScholarGradesAvailable = await Grades.findOne({
        user: req.params.id,
      });

      if (!isScholarGradesAvailable) {
        let newGrades = new Grades({
          user: userId,
        });

        for await (const [key, value] of Object.entries(req.body)) {
          newGrades[key] = value;
        }

        await newGrades.save();
        res.status(201).json({ message: "Scholar's grades added" });
      } else {
        return next(new httpError('Scholar grades already exists'));
      }
    } catch (error) {
      console.log(error);
      return next(new httpError('Error adding scholar grades'));
    }
  },

  editScholarGrades: async (req, res, next) => {
    try {
      const scholarGrades = await Grades.findOne({
        user: req.params.id.toString(),
      });

      if (scholarGrades) {
        for await (const [key, value] of Object.entries(req.body)) {
          scholarGrades[key] = value;
        }

        await scholarGrades.save();
        res.status(200).json({ message: "Scholar's grades updated" });
      } else {
        return next(new httpError('Scholar grades not found'));
      }
    } catch (error) {
      console.log(error);
      return next(new httpError('Error updating scholar grades'));
    }
  },
};

module.exports = gradesController;
