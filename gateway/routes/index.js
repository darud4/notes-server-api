
const router = require('express').Router();
const { createProxyMiddleware } = require('http-proxy-middleware');

// const usersRouter = require('./users');
// const NotFound = require('../errors/NotFound');
// const { ERRMSG_PAGE_NOT_FOUND } = require('../utils/errorTexts');
// const { CONFIG } = require('../config');

// router.use(createProxyMiddleware({
//     target: users,
//     changeOrigin: true,
// }));

module.exports = router;
