import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app) {
	app.use(
		'/sample',
		createProxyMiddleware({
			target: 'https://openapi.mnd.go.kr',
			changeOrigin: true	
		})
	)
}