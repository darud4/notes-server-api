const router = require('express').Router();
const { celebrate } = require('celebrate');
const { updateNoteValidation, NoteValidation, userIdValidation, createNoteValidation } = require('../utils/joiValidators');

const {
  updateNote,
  deleteNote,
  getAllNotes, createNote, getOneNote,
} = require('../controllers/notes');

router.get('/', celebrate(userIdValidation), getAllNotes);
router.post('/', celebrate(createNoteValidation), createNote);
router.get('/:id', celebrate(NoteValidation), getOneNote);
router.patch('/:id', celebrate(updateNoteValidation), updateNote);
router.delete('/:id', celebrate(NoteValidation), deleteNote);

module.exports = router;
