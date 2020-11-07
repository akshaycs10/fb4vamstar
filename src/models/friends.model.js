const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const friendModel = new mongoose.Schema({
  timestamp: {type: Date, required: true},
  receiverId:  { type: Schema.Types.Number, ref: 'user', required: true},
  senderId:  { type: Schema.Types.Number, ref: 'user', required: true}
});

module.exports = mongoose.model('friend', friendModel);
