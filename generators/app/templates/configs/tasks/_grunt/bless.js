module.exports = {
	css: {
		options: {
			force: true
		},
		files: {
			'<%= paths.app %>/css/app.bundle.css': ['<%= paths.app %>/css/app.bundle.css']
		}
	}
};