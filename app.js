const express = require('express');
require('dotenv').config();

const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { limiter } = require('./utils/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./utils/errorHandler');
const { CONFIG } = require('./config');
// const router = require('./routes/index');

const corsOptions = {
  origin: 'http://localhost:3000',
};

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json({ extended: true }));

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

console.log(`Listening on port ${CONFIG.port}`);
app.listen(CONFIG.port);
