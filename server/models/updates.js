const mongoose = require('mongoose');

const updatesSchema = new mongoose.Schema(
  {
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    name: String,
    age: Number,
    address: String,
    city: String,
    province: String,
    island: String,
    schoolAttended: String,
    degreeOrProgram: String,
    yearAdmitted: String,
    yearEndedOrGraduated: String,
    latinHonors: String,
    employed: String,
    aboitizCompany: String,
    company: String,
    designation: String,
  },
  { strict: false }
);

module.exports = mongoose.model('Updates', updatesSchema);
