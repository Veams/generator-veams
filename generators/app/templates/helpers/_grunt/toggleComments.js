module.exports = {
	customOptions: {
		options: {
			removeCommands: true
		},
		files: [{
			cwd: '<%= paths.dev %>',
			dest: '<%= paths.dev %>',
			expand: true,
			src: ['**/*.html']
		}]
	}
};