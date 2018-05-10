module.exports = {
	options: {
		processImport: false
	},
	minify: {
		expand: true,
		cwd: '<%= paths.dest %>/css/',
		src: ['*.css'],
		dest: '<%= paths.dest %>/css/'
	}
};