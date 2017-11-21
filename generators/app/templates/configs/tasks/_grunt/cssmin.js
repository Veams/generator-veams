module.exports = {
	options: {
		processImport: false
	},
	minify: {
		expand: true,
		cwd: '<%= paths.app %>/css/',
		src: ['*.css'],
		dest: '<%= paths.app %>/css/'
	}
};