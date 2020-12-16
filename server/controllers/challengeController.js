const Challenge = require('../models/challenge');
const { challengeStates } = require('../constants.js');

const getChallenges = async (req, res) => {
    const challenges = await Challenge.find({userId: req.user._id});
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
    const {name, proof, milestone} = req.body;
    const challengeModel = new Truck({name, proof, milestone, userId: req.user._id});
    await challengeModel.save();
    res.status(201).json({message: 'Challenge created successfully'});
  };

const deleteChallenge = async (req, res) => {
    await Challenge.findByIdAndDelete(req.user._id);
    res.status(200).json({message: 'Challenge deleted successfully'});
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
    await Truck.findByIdAndUpdate(req.params.id, {'$set': {status}});
    res.status(200).json({message: 'Challenge posted successfully'});
  };

module.exports = {
  getChallenges,
  getChallenge,
  addChallenge,
  deleteChallenge,
  updateChallenge,
  changeChallengeStatus
};
