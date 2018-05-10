module.exports = {
	css: {
		options: {
			force: true
		},
		files: {
			'<%= paths.dest %>/css/app.bundle.css': ['<%= paths.dest %>/css/app.bundle.css']
		}
	}
};