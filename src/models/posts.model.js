const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const postModel = new mongoose.Schema({
 imageUrl: String,
 timestamp: {type: Date, required: true},
 text: String,
 postId: Number,
 userId:  { type: Schema.Types.Number, ref: 'user' }
});

module.exports = mongoose.model('post', postModel);
