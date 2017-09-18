module.exports = {
	options: {
		jshintrc: '<%= paths.helpers %>/tasks/.jshintrc',
		force: true
	},
	all: [
		'<%= paths.src %>/shared/scripts/**/*.js',
		'<%= paths.src %>/shared/components/**/*.js',
		'<%= paths.src %>/shared/utilities/**/*.js'
	]
};