module.exports = {
	dist: {
		options: {
			config: '<%= paths.helpers %>/tasks/jscs.config.json',
			force: false
		},
		src: [
			'<%= paths.app %>/shared/scripts/**/*.js',
			'<%= paths.app %>/shared/components/**/*.js',
			'<%= paths.app %>/shared/utilities/**/*.js'
		]
	}
};