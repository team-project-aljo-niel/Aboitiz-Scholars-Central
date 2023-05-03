const mongoose = require('mongoose');

const scholarSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  schoolAttended: String,
  degreeOrProgram: String,
  yearAdmitted: Number,
  yearEndedOrGraduated: Number,
  status: String,
  terminationRemarks: String,
  latinHonors: String,
  employed: Boolean,
  aboitizCompany: Boolean,
  designation: String,
  company: String,
});

module.exports = mongoose.model('Scholars', scholarSchema);
