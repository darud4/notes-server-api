const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { makeToken } = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');
const DuplicateUser = require('../errors/DuplicateUser');
const BadRequest = require('../errors/BadRequest');
const {
  ERRMSG_USER_CANNOT_BE_UPDATED,
  ERRMSG_BAD_REQUEST,
  ERRMSG_EMAIL_ALREADY_EXISTS,
  ERRMSG_USER_ID_NOT_FOUND,
  ERRMSG_USER_CANNOT_BE_DELETED,
} = require('../utils/errorTexts');

function handleUserError(error, next) {
  if (['ValidationError', 'CastError'].includes(error.name)) next(new BadRequest(ERRMSG_BAD_REQUEST));
  else if (error.name === 'SequelizeUniqueConstraintError') next(new DuplicateUser(ERRMSG_EMAIL_ALREADY_EXISTS));
  else next(error);
}

module.exports.createUser = (req, res, next) => {
  const {
    name, password, email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, password: hash, email,
    }))
    .then((user) => res.status(200).send({
      name: user.name,
      email: user.email,
    }))
    .catch((error) => handleUserError(error, next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = makeToken({ id: user.id });
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports.getOurUser = (req, res, next) => {
  const { id } = req.user;
  return User.findByPk(id)
    .then((user) => {
      if (user) {
        const { dataValues: { password, ...answer } } = user;
        return res.status(200).send(answer);
      }
      throw new NotFound(ERRMSG_USER_ID_NOT_FOUND);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { id } = req.user;
  const { name, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.update(
      { name, password: hash },
      { where: { id } },
    ))
    .then((rowsUpdated) => (
      rowsUpdated
        ? res.status(200).send({ name })
        : Promise.reject(ERRMSG_USER_CANNOT_BE_UPDATED)))
    .catch((error) => handleUserError(error, next));
};

module.exports.deleteProfile = (req, res, next) => {
  const { id } = req.user;
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => (
      (user.id === id)
        ? User.destroy({ where: { id } })
        : Promise.reject(ERRMSG_USER_CANNOT_BE_DELETED)))
    .then((rowsDeleted) => (
      rowsDeleted
        ? res.status(200).send({ email })
        : Promise.reject(ERRMSG_USER_CANNOT_BE_DELETED)))
    .catch((error) => handleUserError(error, next));
};
