const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value);
    }
  },
  password: String,
  firstName: String,
  lastName: String,
  phone: String,
  birthday: String,
  avatar: String,
  created_date: {
    type: Date,
    default: new Date()
  }
});
const User = mongoose.model('user', userSchema);

module.exports = User;
