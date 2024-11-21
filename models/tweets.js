const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  timestamp: Date,
  tweet: String,
});

const Tweet = mongoose.model('tweets', usersSchema);

module.exports = Tweet;
