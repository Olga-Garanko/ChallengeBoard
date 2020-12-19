const {Router} = require('express');
const router = Router();
const {getUsers, getUser, deleteUser, changePass} = require('../controllers/userController');

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({
  passError: true
});

const passwordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required()
});

router.get('/', getUsers);
router.get('/me', getUser);

router.delete('/me', deleteUser);
router.patch('/me/password', validator.body(passwordSchema), changePass);

module.exports = router;
