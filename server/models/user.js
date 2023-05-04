const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: String,
  email: { type: String, required: true },
  phone: String,
  access: String,
  userName: { type: String, required: true },
  password: { type: String, required: true },
  scholarData: [{ type: mongoose.Schema.Types.ObjectId, ref: 'scholars' }],
});

module.exports = mongoose.model('Users', userSchema);
