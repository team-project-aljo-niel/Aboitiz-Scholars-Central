const Scholar = require("../models/scholar");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const httpError = require("../models/httpError");
const bcrypt = require("bcrypt");

const capitalize = (value) => {
  const result = value[0]?.toUpperCase() + value?.slice(1);
  return `${result}`;
};

const scholarController = {
  getAllScholars: async (req, res, next) => {
    try {
      const allScholars = await Scholar.find();
      res.json(allScholars);
    } catch (error) {
      console.log(error);
      return next(new httpError("Error getting scholars", 500));
    }
  },

  createScholarDetails: async (req, res, next) => {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      const userId = decodedToken.userId;
      const userDetails = await User.findOne({ _id: userId });
      const isScholarDetailsAvailable = await Scholar.findOne({ user: userId });

      if (!isScholarDetailsAvailable) {
        let newScholar = new Scholar({
          user: userId,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
        });

        for await (const [key, value] of Object.entries(req.body)) {
          newScholar[key] = value;
        }
        await newScholar.save();
        userDetails.scholarData = newScholar._id;
        userDetails.save();
        res.status(200).send("Created scholar details succesfully");
      } else {
        return next(new httpError("Scholar details already exists", 409));
      }
    } catch (error) {
      console.log(error);
      return next(new httpError("Error creating scholar details", 500));
    }
  },

  updateScholarDetails: async (req, res, next) => {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      const userId = decodedToken.userId;
      const currentScholar = await Scholar.findOne({ user: userId });

      // loop through request body and update scholarData
      for await (const [key, value] of Object.entries(req.body)) {
        currentScholar[key] = value;
      }

      await currentScholar.save();
      res.status(200).send("Scholar info changed succesfully");
    } catch (error) {
      console.log(error);
      return next(new httpError("Error updating scholar details", 500));
    }
  },
  updateScholarDetails: async (req, res, next) => {
    try {
      const updateScholar = await Scholar.findByIdAndUpdate(req.params.id, {
        status: req.body.status,
        terminationRemarks: req.body.terminationRemarks,
        age: req.body.age,
        island: req.body.island,
        province: req.body.province,
        city: req.body.city,
        address: req.body.address,
        schoolAttended: req.body.schoolAttended,
        degreeOrProgram: req.body.degreeOrProgram,
        yearAdmitted: req.body.yearAdmitted,
        yearEndedOrGraduated: req.body.yearEndedOrGraduated,
        latinHonors: req.body.latinHonors,
        employed: req.body.employed,
        aboitizCompany: req.body.aboitizCompany,
        designation: req.body.designation,
        company: req.body.company,
        sponsoringBusinessUnit: req.body.sponsoringBusinessUnit,
      });

      res.status(200).send("User Access changed succesfully");
    } catch (error) {
      return next(new httpError("Error changing user access", 500));
    }
  },
};

module.exports = scholarController;
