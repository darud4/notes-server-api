const Note = require('../models/notes');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const {
  ERRMSG_BAD_REQUEST,
} = require('../utils/errorTexts');

function handleNoteError(error, next) {
  if (['ValidationError', 'CastError'].includes(error.name)) next(new BadRequest(ERRMSG_BAD_REQUEST));
  else next(error);
}

module.exports.createNote = (req, res, next) => {
  const { uid, title, text, isPinned } = req.body;
  return Note.create({ uid, title, text, isPinned })
    .then((note) => {
      return res.status(200).send(note);
    })
    .catch((error) => handleNoteError(error, next));
};

module.exports.getAllNotes = (req, res, next) => {
  const { uid } = req.body;
  return Note.findAll({ where: { uid } })
    .then((notes) => {
      return res.status(200).send(notes);
    })
    .catch((error) => handleNoteError(error, next));
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
    .catch((error) => handleNoteError(error, next));
};
