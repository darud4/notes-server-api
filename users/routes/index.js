const router = require('express').Router();
const { celebrate } = require('celebrate');
const bodyParser = require('body-parser');

const usersRouter = require('./users');
const notesRouter = require('./notes');
const mailRouter = require('./mail');
const NotFound = require('../errors/NotFound');
const { loginValidation, registerValidation } = require('../utils/joiValidators');
const { login, createUser } = require('../controllers/users');
const { checkToken } = require('../middlewares/auth');
const { ERRMSG_PAGE_NOT_FOUND } = require('../utils/errorTexts');

const jsonBodyParser = bodyParser.json();

router.post('/signin', [jsonBodyParser, celebrate(loginValidation)], login);
router.post('/signup', [jsonBodyParser, celebrate(registerValidation)], createUser);

router.use(checkToken);

router.use('/users', jsonBodyParser, usersRouter);

// bodyParser искажает тело запроса, поэтому мы не можем использовать его вместе с прокси
router.use('/notes', notesRouter);
router.use('/mail', mailRouter);

router.use((req, res, next) => next(new NotFound(ERRMSG_PAGE_NOT_FOUND)));

module.exports = router;
