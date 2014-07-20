module.exports = {
	options: {
		processImport: false
	},
	minify: {
		expand: true,
		cwd: '<%= paths.dev %>/css/',
		src: ['*.css'],
		dest: '<%= paths.dev %>/css/'
	}
};