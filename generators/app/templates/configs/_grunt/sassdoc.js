module.exports = {
	options: {
		config: '<%= paths.helpers %>/tasks/sassdoc.config.json'
	},
	dist: {
		src: [
			'<%= paths.src %>/shared/styles/**/*.scss',
			'<%= paths.src %>/shared/components/**/*.scss',
			'<%= paths.src %>/shared/utilities/**/*.scss'
		]
	}
};