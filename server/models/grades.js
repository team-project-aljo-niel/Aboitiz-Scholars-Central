const mongoose = require('mongoose');

const gradesSchema = new mongoose.Schema(
  {
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    firstYear: {
      firstTerm: String,
      secondTerm: String,
      thirdTerm: String,
      fourthTerm: String,
    },
    secondYear: {
      firstTerm: String,
      secondTerm: String,
      thirdTerm: String,
      fourthTerm: String,
    },
    thirdYear: {
      firstTerm: String,
      secondTerm: String,
      thirdTerm: String,
      fourthTerm: String,
    },
    fourthYear: {
      firstTerm: String,
      secondTerm: String,
      thirdTerm: String,
      fourthTerm: String,
    },
    fifthYear: {
      firstTerm: String,
      secondTerm: String,
      thirdTerm: String,
      fourthTerm: String,
    },
  },
  { strict: false }
);

module.exports = mongoose.model('Grades', gradesSchema);
