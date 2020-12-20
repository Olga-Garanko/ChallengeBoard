const User = require('../models/user');

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({message: 'There is no such user'});
    }
    const {_id, username, email, created_date} = user;
    res.status(200).json({user: {
      _id,
      username,
      email,
      created_date
    }});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.status(200).json({message: 'Profile deleted successfully'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const changePass = async (req, res) => {
  const {oldPassword, newPassword} = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({message: 'There is no such user'});
    }
    if (user && user.password !== oldPassword) {
      return res.status(400).json({message: 'Invalid old password'});
    }
    if (user && user.password === oldPassword) {
      await User.findByIdAndUpdate(user._id, {'$set': {password: newPassword}});
      res.status(200).json({message: 'Password changed successfully'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

module.exports = {
  getUser,
  deleteUser,
  changePass
};
