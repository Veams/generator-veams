module.exports = {
	options: {
		config: '<%= paths.helpers %>/tasks/sassdoc.config.json'
	},
	dist: {
		src: [
			'<%= paths.app %>/shared/styles/**/*.scss',
			'<%= paths.app %>/shared/components/**/*.scss',
			'<%= paths.app %>/shared/utilities/**/*.scss'
		]
	}
};