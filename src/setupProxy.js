const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/maoyan',
    createProxyMiddleware({
      // target: 'http://localhost:5000',
      target: 'https://m.maoyan.com/ajax',
      changeOrigin: true,
      pathRewrite: {
        '^/api/maoyan': ''
      }
    })
  );
};
