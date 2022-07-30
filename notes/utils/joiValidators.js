const { Joi } = require('celebrate');

module.exports.createNoteValidation = {
  body: Joi.object().keys({
    title: Joi.string().required().max(40),
    text: Joi.string().required(),
    isPinned: Joi.boolean(),
    uid: Joi.number().required(),
  }),
};

module.exports.updateNoteValidation = {
  body: Joi.object().keys({
    title: Joi.string().required().max(40),
    text: Joi.string().required(),
  }),
};

module.exports.userIdValidation = {
  body: Joi.object().keys({
    uid: Joi.number().required(),
  }),
};
