const router = require('express').Router();
const { createProxyMiddleware } = require('http-proxy-middleware');
const { CONFIG } = require('../config');

router.use(createProxyMiddleware({
  target: CONFIG.notesService,
  //    changeOrigin: true,
  pathRewrite: function (path, req) { return path.replace('/notes', `/notes/${req.user.id}`) },
}));

module.exports = router;
