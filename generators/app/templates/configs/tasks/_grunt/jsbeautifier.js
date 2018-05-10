module.exports = {
	files: [
		"!<%= paths.app %>/shared/scripts/vendor/**/*.js",
		"!<%= paths.app %>/shared/scripts/libs/**/*.js",
		"<%= paths.app %>/shared/scripts/**/*.js"
	],
	options: {
		config: "<%= paths.helpers %>/tasks/.jsbeautifierrc"
	}
};