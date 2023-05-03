const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  sex: String,
  email: String,
  phone: String,
  access: String,
});

module.exports = mongoose.model('users', userSchema);
