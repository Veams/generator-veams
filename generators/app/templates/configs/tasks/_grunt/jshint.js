module.exports = {
	options: {
		jshintrc: '<%= paths.helpers %>/tasks/.jshintrc',
		force: true
	},
	all: [
		'<%= paths.app %>/shared/scripts/**/*.js',
		'<%= paths.app %>/shared/components/**/*.js',
		'<%= paths.app %>/shared/utilities/**/*.js'
	]
};