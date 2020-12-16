const mongoose = require('mongoose');
const { challengeStates } = require('../constants.js');

const badgeSchema = mongoose.Schema({
  message: String,
  level: String,
  time: {
    type: Date,
    default: Date.now()
  }
});

const challengeSchema = mongoose.Schema({
  name: String,  
  userId: mongoose.Types.ObjectId,
  status: {
    type: String,
    default: challengeStates.CREATED
  },
  startDate: Date,
  finishDate: Date,
  milestone: Number,
  progress: [Date],
  badges: [badgeSchema],
  created_date: {
    type: Date,
    default: Date.now()
  }
});

const Challenge = mongoose.model('challenge', challengeSchema);

module.exports = Challenge;
