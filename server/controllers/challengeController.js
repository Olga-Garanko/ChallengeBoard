const Challenge = require('../models/challenge');

const getChallenges = async (req, res) => {
    // try {
    //   const challenge = await Challenge.find({req.user._id});
    //   if (!challenge) {
    //     return res.status(400).json({message: 'There is no such challenge'});
    //   }
    //   res.status(200).json({challenge});
    // } catch (err) {
    //   res.status(500).json({message: err.message});
    // }
};

const getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findOne({_id: req.params.id, userId: req.user._id});
    if (!challenge) {
      return res.status(400).json({message: 'There is no such challenge'});
    }
    res.status(200).json({challenge});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const addChallenge = async (req, res) => {
    // const {type} = req.body;
    // const truckType = truckTypes.find((item) => item.type === type.toUpperCase());
    // if (!truckType) {
    //   return res.status(400).json({message: 'No truck with such type exist'});
    // }
    // try {
    //   const truckModel = new Truck({type: type.toUpperCase(), created_by: req.user._id});
    //   await truckModel.save();
    //   res.status(201).json({message: 'Truck created successfully'});
    // } catch (err) {
    //   res.status(500).json({message: err.message});
    // }
  };

const deleteChallenge = async (req, res) => {
//   try {
//     await Challenge.findByIdAndDelete(req.user._id);
//     res.status(200).json({message: 'Profile deleted successfully'});
//   } catch (err) {
//     res.status(500).json({message: err.message});
//   }
};

const updateChallenge = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) {
//       return res.status(400).json({message: 'There is no such user'});
//     }
//     if (user && user.password !== oldPassword) {
//       return res.status(400).json({message: 'Invalid old password'});
//     }
//     if (user && user.password === oldPassword) {
//       await User.findByIdAndUpdate(user._id, {'$set': {password: newPassword}});
//       res.status(200).json({message: 'Password changed successfully'});
//     }
//   } catch (err) {
//     res.status(500).json({message: err.message});
//   }
};

const changeChallengeStatus = async (req, res) => {
    // try {
    //     const truck = await Truck.findOne({_id: req.params.id, created_by: req.user._id});
    //     if (!truck) {
    //       return res.status(400).json({message: 'There is no truck with such id'});
    //     }
    //     await Truck.updateMany({created_by: req.user._id}, {'$set': {assigned_to: null, status: 'OS'}});
    //     await Truck.findByIdAndUpdate(req.params.id, {'$set': {assigned_to: req.user._id, status: 'IS'}});
    //     res.status(200).json({message: 'Truck assigned successfully'});
    //   } catch (err) {
    //     res.status(500).json({message: err.message});
    //   }
  };

module.exports = {
  getChallenges,
  getChallenge,
  addChallenge,
  deleteChallenge,
  updateChallenge,
  changeChallengeStatus
};
