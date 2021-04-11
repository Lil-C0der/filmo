const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/maoyan',
    createProxyMiddleware({
      target: 'https://m.maoyan.com/ajax',
      changeOrigin: true,
      pathRewrite: {
        '^/api/maoyan': ''
      }
    })
  );
  app.use(
    '/api/maoyan2',
    createProxyMiddleware({
      target: 'https://api.maoyan.com/mmdb',
      // target: 'https://m.maoyan.com/mmdb',
      changeOrigin: true,
      pathRewrite: {
        '^/api/maoyan2': ''
      }
    })
  );
  app.use(
    '/api/baidu',
    createProxyMiddleware({
      target: 'https://api.map.baidu.com/location',
      changeOrigin: true,
      pathRewrite: {
        '^/api/baidu': ''
      }
    })
  );
  app.use(
    '/api/tian',
    createProxyMiddleware({
      target: 'http://api.tianapi.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/tian': ''
      }
    })
  );
  app.use(
    '/api/local',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/api/local': ''
      }
    })
  );
  app.use(
    '/api/douban',
    createProxyMiddleware({
      target: 'https://v.xhboke.com/douban',
      changeOrigin: true,
      pathRewrite: {
        '^/api/douban': ''
      }
    })
  );
};
