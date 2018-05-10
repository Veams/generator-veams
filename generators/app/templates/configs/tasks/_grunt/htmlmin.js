module.exports = {
	dist: {
		options: {
			removeComments: false,
			collapseWhitespace: true
		},
		files: [
			{
				expand: true,
				cwd: '<%= paths.dest %>/',
				src: '**/*.html',
				dest: '<%= paths.dest %>/'
			}
		]
	}
};