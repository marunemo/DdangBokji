const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(
		`/${process.env.REACT_APP_MND_TOKEN}`,
		createProxyMiddleware({
			target: 'https://openapi.mnd.go.kr',
			changeOrigin: true	
		})
	)
}