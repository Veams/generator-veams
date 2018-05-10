module.exports = {
	options: {
		log: true
	},
	cmqDist: {
		files: {
			'<%= paths.dest %>/css/app.bundle.css': ['<%= paths.dest %>/css/app.bundle.css']
		}
	}
};