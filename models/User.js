const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email address.'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 72,
    validate: {
      validator: function (value) {
        return !value.toLowerCase().includes('password');
      },
      message: 'Password cannot contain the word "password".'
    }
  }
});

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() },process.env.JWT_SECRET,{ expiresIn: '1h' })
  console.log("here!", token)
  user.token = token
  await user.save()
  return token
};

  userSchema.methods.checkPassword = async function(password) {
    const res = await bcrypt.compare(password, this.password);
    return res
  };
  


const User = mongoose.model('User', userSchema);

module.exports = User;
