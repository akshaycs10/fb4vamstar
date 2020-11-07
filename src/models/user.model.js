const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userModel = new mongoose.Schema({
  Age: Number,
  Name: String,
  email: email,
  userId: Number
});

module.exports = mongoose.model('user', activityModel);