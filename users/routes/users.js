const router = require('express').Router();
const { celebrate } = require('celebrate');
const { updateProfileValidation, deleteProfileValidation } = require('../utils/joiValidators');

const {
  getOurUser, updateProfile, deleteProfile,
} = require('../controllers/users');

router.get('/me', getOurUser);
router.patch('/me', celebrate(updateProfileValidation), updateProfile);
router.delete('/me', celebrate(deleteProfileValidation), deleteProfile);

module.exports = router;
