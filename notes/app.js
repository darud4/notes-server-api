const express = require('express');
require('dotenv').config();

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./utils/errorHandler');
const { CONFIG } = require('./config');

const app = express();

app.use(requestLogger);
app.use(bodyParser.json({ extended: true }));

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(CONFIG.port);
