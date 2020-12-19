const {Router} = require('express');
const {register, login, forgotPassword, test} = require('../controllers/authController');
const router = Router();

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({
  passError: true
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

router.get('/test', test);
router.post('/login', validator.body(loginSchema), login);
router.post('/register', validator.body(registerSchema), register);
router.post('/forgot_password', validator.body(loginSchema), forgotPassword);

module.exports = router;
