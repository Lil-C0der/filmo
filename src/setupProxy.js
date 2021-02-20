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
  app.use(
    '/api/baidu',
    createProxyMiddleware({
      // target: 'http://localhost:5000',
      target:
        'https://api.map.baidu.com/location/ip?ak=c7rsOB1n5WsFayinNBrxXSDpZz4pncG2&coor=bd09ll',
      changeOrigin: true,
      pathRewrite: {
        '^/api/baidu': ''
      }
    })
  );
};
