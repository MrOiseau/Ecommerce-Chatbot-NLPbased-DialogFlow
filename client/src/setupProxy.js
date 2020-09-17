const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    // Redirektujemo requests koji pocinju sa stringom "/api" na backend
    //app.use(createProxyMiddleware('^/api', { target: 'http://localhost:5000', changeOrigin: true }));
    // app.use('/api', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
    app.use('/api', createProxyMiddleware({ target: 'http://[::1]:5000', secure: false, changeOrigin: true }));
    
};