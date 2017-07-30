module.exports = {
	files: [
		"!<%= paths.src %>/shared/scripts/vendor/**/*.js",
		"!<%= paths.src %>/shared/scripts/libs/**/*.js",
		"<%= paths.src %>/shared/scripts/**/*.js"
	],
	options: {
		config: "<%= paths.helpers %>/task-configs/.jsbeautifierrc"
	}
};