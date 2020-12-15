const User = require('../models/user');
const {jwtSecret} = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');

const register = async (req, res) => {
  const {email, password, role} = req.body;
  try {
    const user = await User.findOne({email});
    if (user) {
      res.status(400).json({message: 'User already exist'});
    }
    if (!user) {
      bcrypt.hash(password, saltRounds)
          .then(async (pass) => {
            const userModel = new User({
              email,
              password: pass,
              role
            });
            await userModel.save();
            res.status(201).json({message: 'Profile created successfully'});
          });
    }
  } catch (err) {
    res.status(500).json({message: err});
  }
};

const login = (req, res) => {
  const {email, password} = req.body;
  User.findOne({email})
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(400).json({message: 'Invalid login'});
        }
        if (user) {
          bcrypt.compare(password, user.password)
              .then((result) => {
                if (!result) {
                  return res.status(400).json({message: 'Invalid password'});
                }
                let token;
                try {
                  token = jwt.sign(JSON.stringify({_id: user._id, email: user.email, role: user.role}), jwtSecret);
                } catch (err) {
                  return res.status(500).json({message: err.message});
                }
                res.status(200).json({jwt_token: token});
              })
              .catch((err) => res.status(500).json({message: err}));
        }
      })
      .catch((err) => {
        res.status(500).json({message: err.message});
      });
};

const forgotPassword = (req, res) => {
  const {email, password} = req.body;
  User.findOne({email})
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(400).json({message: 'There is no user with such email'});
        }
        bcrypt.hash(password, saltRounds)
            .then(async (pass) => {
              const testAccount = await nodemailer.createTestAccount();
              const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                  user: testAccount.user,
                  pass: testAccount.pass
                }
              });
              const info = await transporter.sendMail({
                from: '"Fred Foo" <foo@example.com>',
                to: email,
                subject: 'New password',
                text: 'Your new password is ${password}',
                html: `<b>Hello.</b><p>Your new password is ${pass}</p>`
              });
              console.log('Message sent: %s', info.accepted);
              User.findOneAndUpdate({email}, {'$set': {password: pass}})
                  .exec()
                  .then(() => res.status(200).json({message: 'New password sent to your email'}) )
                  .catch((err) => res.status(500).json({message: err}));
            })
            .catch((err) => res.status(500).json({message: err}));
      })
      .catch((err) => {
        res.status(500).json({error: err.message});
      });
};

module.exports = {
  register,
  login,
  forgotPassword
};
