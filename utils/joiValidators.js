const { Joi } = require('celebrate');

module.exports.registerValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
};

module.exports.loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

module.exports.idValidation = {
  params: Joi.object().keys({
    id: Joi.number().required().min(1).max(10),
  }),
};

module.exports.updateProfileValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
};
