module.exports = {
	files: [
		"!<%= paths.src %>/js/vendor/**/*.js",
		"!<%= paths.src %>/js/libs/**/*.js",
		"<%= paths.src %>/js/**/*.js"
	],
	options: {
		config: "<%= paths.helpers %>/task-configs/.jsbeautifierrc"
	}
};