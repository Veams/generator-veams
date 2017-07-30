module.exports = {
	all: {
		options: { // Want to know what configurations are available? http://htmlhint.com/
			htmlhintrc: '<%= paths.helpers %>/task-configs/.htmlhintrc',
			force: true
		},
		src: ['<%= paths.dev %>/*.html']
	}
};