const express = require('express');
require('dotenv').config();

const helmet = require('helmet');
const { limiter } = require('./utils/rateLimiter');
const { fetch } = require('cross-fetch');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./utils/errorHandler');
const { CONFIG } = require('./config');
const users = ['users1', 'users2', 'users3'];

let index = 0;

const corsOptions = {
  origin: 'http://localhost:3000',
};

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cors(corsOptions));


app.use(
  async (req, res, next) => {
    let success = false;
    let count = 0;

    while (count < users.length && !success) {
      try {
        const res = await fetch(users[index]);
        if (!res || res.status >= 400) {
          throw new Error("Bad response from server");
        }
        success = true;
      }
      catch (error) {
        count++;
        index++;
      }
    }
    if (!success) return next(new Error('no available services found'));

    console.log(success, 'Redirecting to', users[index]);

    createProxyMiddleware({
      target: users[index],
      //    changeOrigin: true,
      //     pathRewrite: function (path, req) { return path.replace('/notes', `/notes/${req.user.id}`) },
    });

    index++;
    if (index >= users.length) index = 0;
    next();
  }
);

app.use(errorLogger);
app.use(errorHandler);

app.listen(CONFIG.port);
