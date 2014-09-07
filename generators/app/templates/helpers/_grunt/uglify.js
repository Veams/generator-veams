module.exports = {
	options: {
		compress: {
			global_defs: {
				"DEBUG": false
			},
			dead_code: true
		},
		sourceMap: true
	},
	app: {
		files: { <% if (features && features.length > 0 && features.indexOf('installDemoContent') != -1) { %>
			'<%%= paths.src %>/js/app.min.js': [
				'<%%= paths.src %>/js/demo.js'
			] <% } %>
		}
	}
};