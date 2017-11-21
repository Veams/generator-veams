module.exports = {
	dist: {
		options: {
			removeComments: false,
			collapseWhitespace: true
		},
		files: [
			{
				expand: true,
				cwd: '<%= paths.app %>/',
				src: '**/*.html',
				dest: '<%= paths.app %>/'
			}
		]
	}
};