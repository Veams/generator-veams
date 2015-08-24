module.exports = {
	options: {
		jshintrc: '<%= paths.helpers %>/task-configs/.jshintrc',
		force: true
	},
	all: [
	'<%= paths.src %>/js/**/*.js'
	]
};