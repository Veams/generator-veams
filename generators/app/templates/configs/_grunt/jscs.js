module.exports = {
	dist: {
		options: {
			config: '<%= paths.helpers %>/task-configs/jscs.airbnb.json',
			force: false
		},
		src: [
			'<%= paths.src %>/shared/scripts/**/*.js',
			'<%= paths.src %>/shared/components/**/*.js',
			'<%= paths.src %>/shared/utilities/**/*.js'
		]
	}
};