const router = require('express').Router();
const { celebrate } = require('celebrate');
const { updateNoteValidation, noteValidation, userIdValidation, createNoteValidation } = require('../utils/joiValidators');

const {
  updateNote,
  deleteNote,
  getAllNotes, createNote, getOneNote,
} = require('../controllers/notes');

router.get('/:uid', celebrate(userIdValidation), getAllNotes);
router.post('/:uid', celebrate(createNoteValidation), createNote);
router.get('/:uid/:id', celebrate(noteValidation), getOneNote);
router.patch('/:uid/:id', celebrate(updateNoteValidation), updateNote);
router.delete('/:uid/:id', celebrate(noteValidation), deleteNote);

module.exports = router;
