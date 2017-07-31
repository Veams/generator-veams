module.exports = {
	options: {
		config: '<%= paths.helpers %>/task-configs/sassdoc.conf.json'
	},
	dist: {
		src: [
			'<%= paths.src %>/shared/styles/**/*.scss',
			'<%= paths.src %>/shared/components/**/*.scss',
			'<%= paths.src %>/shared/utilities/**/*.scss'
		]
	}
};