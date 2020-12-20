const {Router} = require('express');
const router = Router();
const {getChallenges, getChallenge, addChallenge, deleteChallenge, updateChallenge, changeChallengeStatus, proofChallenge} = require('../controllers/challengeController');

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({
  passError: true
});

const bodySchema = Joi.object({
    title: Joi.string().required(),
    goal: Joi.number().required()
});

router.get('/', getChallenges);
router.get('/:id', getChallenge);
router.delete('/:id', deleteChallenge);
router.patch('/:id/status', changeChallengeStatus);
router.patch('/:id/proof', proofChallenge);
router.post('/', validator.body(bodySchema), addChallenge);
router.put('/:id', validator.body(bodySchema), updateChallenge);

module.exports = router;
