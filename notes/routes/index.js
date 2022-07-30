const router = require('express').Router();
const notesRouter = require('./notes');
const NotFound = require('../errors/NotFound');
const { ERRMSG_PAGE_NOT_FOUND } = require('../utils/errorTexts');

router.use('/notes', notesRouter);

router.use((req, res, next) => next(new NotFound(ERRMSG_PAGE_NOT_FOUND)));

module.exports = router;
