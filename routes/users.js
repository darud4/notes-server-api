const router = require('express').Router();
// const { celebrate } = require('celebrate');
// const { updateProfileValidation } = require('../utils/joiValidators');

const {
  getOurUser, updateProfile, deleteProfile,
} = require('../controllers/users');

router.get('/me', getOurUser);
router.patch('/me', updateProfile);
router.delete('/me', deleteProfile);

module.exports = router;
