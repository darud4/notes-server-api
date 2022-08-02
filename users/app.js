const express = require('express');
require('dotenv').config();

const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const notesRouter = require('./routes/notes');
const { limiter } = require('./utils/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./utils/errorHandler');
const { CONFIG } = require('./config');
const { checkToken } = require('./middlewares/auth');

const corsOptions = {
  origin: 'http://localhost:3000',
};

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cors(corsOptions));

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(CONFIG.port);
