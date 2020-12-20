const Challenge = require('../models/challenge');
const { challengeStates } = require('../constants.js');

const getChallenges = async (req, res) => {
  let challenges;
  if (req.query.status === 'archived') {
    challenges = await Challenge.find({userId: req.user._id, archived: true}).sort({created_date: 1});
  } else if (!req.query.status) {
    challenges = await Challenge.find({userId: req.user._id});
  } else {
    challenges = await Challenge.find({userId: req.user._id, status: req.query.status.toLowerCase(), archived: false}).sort({created_date: -1});
  }
  res.status(200).json({challenges});
};

const getChallenge = async (req, res) => {
    const challenge = await Challenge.findOne({_id: req.params.id, userId: req.user._id});
    if (!challenge) {
        return res.status(400).json({message: 'There is no such challenge'});
    }
    res.status(200).json({challenge});
};

const addChallenge = async (req, res) => {
    const {title, goal} = req.body;
    const challengeModel = new Challenge({title, goal, userId: req.user._id});
    await challengeModel.save();
    res.status(201).json({message: 'Challenge created successfully'});
};

const deleteChallenge = async (req, res) => {
    await Challenge.findByIdAndDelete(req.user._id);
    res.status(200).json({message: 'Challenge deleted successfully'});
};

const proofChallenge = async (req, res) => {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(400).json({message: 'There is no such challenge'});
    }
    await Challenge.findByIdAndUpdate(req.params.id, {$set: {proofDate: new Date()}});
    res.status(200).json({message: 'Challenge changed successfully'});
};

const updateChallenge = async (req, res) => {
    const {name, proof, milestone} = req.body;
    const challenge = await Challenge.findById(req.params._id);
    if (!challenge) {
      return res.status(400).json({message: 'There is no such challenge'});
    }
    await Challenge.findByIdAndUpdate(req.params._id, { ...challenge, name, proof, milestone});
    res.status(200).json({message: 'Challenge changed successfully'});
};

const changeChallengeStatus = async (req, res) => {
    const challenge = await Challenge.findById(req.params._id);
    if (!challenge) {
      return res.status(400).json({message: 'There is no such challenge'});
    }
    let status = '';
    switch(challenge.status) {
        case challengeStates.CREATED:
            status = challengeStates.STARTED
            break;
        case challengeStates.STARTED:
            status = challengeStates.FINISHED
            break;
        default:
            status = challengeStates.STARTED 
    }
    await Challenge.findByIdAndUpdate(req.params.id, {'$set': {status}});
    res.status(200).json({message: 'Challenge posted successfully'});
  };

module.exports = {
  getChallenges,
  getChallenge,
  addChallenge,
  deleteChallenge,
  updateChallenge,
  changeChallengeStatus,
  proofChallenge
};
