const mongoose = require('mongoose');

const scholarSchema = new mongoose.Schema(
  {
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: String,
    email: { type: String, required: true },
    phone: String,
    islandGroup: String,
    province: String,
    city: String,
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
  },
  { strict: false }
);

module.exports = mongoose.model('Scholars', scholarSchema);
