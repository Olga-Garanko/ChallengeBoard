const {Router} = require('express');
const router = Router();
const {getChallenges, getChallenge, addChallenge, deleteChallenge, updateChallenge, changeChallengeStatus} = require('../controllers/challengeController');

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({
  passError: true
});

const bodySchema = Joi.object({
    name: Joi.string().required(),
    proof: Joi.boolean(),
    milestone: Joi.number()
});

router.get('/', getChallenges);
router.get('/:id', getChallenge);
router.delete('/:id', deleteChallenge);
router.patch('/:id/status', changeChallengeStatus);
router.post('/', validator.body(bodySchema), addChallenge);
router.put('/:id', validator.body(bodySchema), updateChallenge);

module.exports = router;
