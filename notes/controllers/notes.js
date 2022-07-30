const Note = require('../models/notes');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const NotAuthorized = require('../errors/NotAuthorized');

const {
  ERRMSG_BAD_REQUEST,
  ERRMSG_SELECT_NOTE_NOT_YOURS,
  ERRMSG_UPDATE_NOTE_NOT_YOURS,
  ERRMSG_DELETE_NOTE_NOT_YOURS,
  ERRMSG_NOTE_CANNOT_BE_UPDATED,
  ERRMSG_NOTE_CANNOT_BE_DELETED,
  ERRMSG_NOTE_NOT_FOUND,
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

module.exports.getOneNote = (req, res, next) => {
  const { id } = req.params;
  const { uid } = req.body;
  return Note.findByPk(id)
    .then((note) => {
      if (!note) throw new NotFound(ERRMSG_NOTE_NOT_FOUND);
      else if (note.uid === +uid)
        return res.status(200).send(note);
      throw new NotAuthorized(ERRMSG_SELECT_NOTE_NOT_YOURS);
    })
    .catch((error) => handleNoteError(error, next));
};

module.exports.updateNote = (req, res, next) => {
  const { title, text, isPinned, uid } = req.body;
  const { id } = req.params;
  return Note.findByPk(id)
    .then((note) => {
      if (note.uid === +uid) {
        return Note.update(
          { title, text, isPinned },
          { where: { id } },
        );
      }
      throw new NotAuthorized(ERRMSG_UPDATE_NOTE_NOT_YOURS);
    })
    .then((rowsUpdated) => (
      rowsUpdated
        ? res.status(200).send({ id })
        : Promise.reject(ERRMSG_NOTE_CANNOT_BE_UPDATED)))
    .catch((error) => handleNoteError(error, next));
};

module.exports.deleteNote = (req, res, next) => {
  const { id } = req.params;
  const { uid } = req.body;
  return Note.findByPk(id)
    .then((note) => {
      if (note.uid === +uid) {
        return Note.destroy(
          { where: { id } },
        );
      }
      throw new NotAuthorized(ERRMSG_DELETE_NOTE_NOT_YOURS);
    })
    .then((rowsDeleted) => (
      rowsDeleted
        ? res.status(200).send({ id })
        : Promise.reject(ERRMSG_NOTE_CANNOT_BE_DELETED)))
    .catch((error) => handleNoteError(error, next));
};
