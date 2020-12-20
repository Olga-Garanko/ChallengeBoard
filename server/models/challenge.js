const { boolean } = require('joi');
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
  title: String,  
  userId: mongoose.Types.ObjectId,
  status: {
    type: String,
    default: challengeStates.CREATED
  },
  startDate: {
    type: Date,
    default: Date.now()
  },
  finishDate: Date,
  lastCheckDate: Date,
  goal: {
    type: Number,
    default: 30
  },
  proof: {
    type: Boolean,
    default: false
  },
  archived: {
    type: Boolean,
    default: false
  },
  progress: [Date],
  badges: [badgeSchema],
  created_date: {
    type: Date,
    default: Date.now()
  }
});

const Challenge = mongoose.model('challenge', challengeSchema);

module.exports = Challenge;
