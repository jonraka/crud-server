const mongoose = require('mongoose');
const { db } = require('../utils/db');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 100,
    trim: true,
    required: true,
  },
  age: {
    type: Number,
    min: 1,
    max: 120,
    required: true,
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 200,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
  },
});

const userModel = db.model('user', userSchema);

module.exports = {
  userSchema,
  userModel,
};
