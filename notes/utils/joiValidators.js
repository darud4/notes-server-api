const { Joi } = require('celebrate');

module.exports.createNoteValidation = {
  body: Joi.object().keys({
    title: Joi.string().max(40),
    text: Joi.string().required(),
    isPinned: Joi.boolean(),
  }),
  params: Joi.object().keys({
    uid: Joi.number().required(),
  })
};

module.exports.updateNoteValidation = {
  body: Joi.object().keys({
    title: Joi.string().max(40),
    text: Joi.string().required(),
    isPinned: Joi.boolean(),
  }),
  params: Joi.object().keys({
    id: Joi.number().required(),
    uid: Joi.number().required(),
  })
};

module.exports.userIdValidation = {
  params: Joi.object().keys({
    uid: Joi.number().required(),
  }),
};

module.exports.noteValidation = {
  params: Joi.object().keys({
    id: Joi.number().required(),
    uid: Joi.number().required(),
  }),
};
