module.exports = {
	dist: {
		options: {
			removeComments: false,
			collapseWhitespace: true
		},
		files: [
			{
				expand: true,
				cwd: '<%= paths.dev %>/',
				src: '**/*.html',
				dest: '<%= paths.dev %>/'
			}
		]
	}
};