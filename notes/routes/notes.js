const router = require('express').Router();
const { celebrate } = require('celebrate');
const { updateNoteValidation, deleteNoteValidation, userIdValidation, createNoteValidation } = require('../utils/joiValidators');

const {
  updateNote,
  //    deleteNote,
  getAllNotes, createNote, getOneNote,
} = require('../controllers/notes');

router.get('/', celebrate(userIdValidation), getAllNotes);
router.post('/', celebrate(createNoteValidation), createNote);
router.get('/:id', getOneNote);
router.patch('/:id', celebrate(updateNoteValidation), updateNote);
// router.delete('/:id', celebrate(deleteNoteValidation), deleteNote);

module.exports = router;
