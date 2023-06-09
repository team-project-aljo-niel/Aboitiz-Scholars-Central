const mongoose = require('mongoose');

const scholarSchema = new mongoose.Schema(
  {
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: String,
    email: { type: String, required: true },
    phone: String,
    age: Number,
    island: String,
    province: String,
    city: String,
    address: String,
    schoolAttended: String,
    degreeOrProgram: String,
    yearAdmitted: String,
    yearEndedOrGraduated: String,
    status: String,
    terminationRemarks: String,
    latinHonors: String,
    employed: String,
    aboitizCompany: String,
    designation: String,
    company: String,
    sponsoringBusinessUnit: String,
  },
  { strict: false }
);

module.exports = mongoose.model('Scholars', scholarSchema);
