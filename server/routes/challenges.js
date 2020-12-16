const {Router} = require('express');
const router = Router();
const {getChallenges, getChallenge, addChallenge, deleteChallenge, updateChallenge, changeChallengeStatus} = require('../controllers/challengeController');

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({
  passError: true
});

const passwordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required()
});

router.get('/', getChallenges);
router.get('/:id', getChallenge);

router.delete('/:id', deleteChallenge);
router.patch('/:id/status', changeChallengeStatus);

module.exports = router;
