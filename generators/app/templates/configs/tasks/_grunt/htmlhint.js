module.exports = {
	all: {
		options: { // Want to know what configurations are available? http://htmlhint.com/
			htmlhintrc: '<%= paths.helpers %>/tasks/.htmlhintrc',
			force: true
		},
		src: ['<%= paths.dest %>/*.html']
	}
};