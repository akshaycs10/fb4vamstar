const mongoose = require('mongoose');

const activityModel = new mongoose.Schema({
  activityId: Number,
  likes: Number
});

module.exports = mongoose.model('activity', activityModel);

