const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeModel = new mongoose.Schema({
  activityId: { type: Schema.Types.Number, ref: 'activity', required: true},
  active: Boolean,
  userId: { type: Schema.Types.Number, ref: 'user', required: true},
  timestamp: Date,
  type: String
});

module.exports = mongoose.model('like', likeModel);

