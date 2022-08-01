const router = require('express').Router();
const { createProxyMiddleware } = require('http-proxy-middleware');
const { CONFIG } = require('../config');

function notesRouter(req, res, next) {
  const notesProxy = createProxyMiddleware({
    target: CONFIG.notesService,
    changeOrigin: true,
    pathRewrite: { '/notes': `/notes/${req.user.id}` }
  });
  router.use(notesProxy);
  next();
}

router.use(notesRouter);

module.exports = router;
