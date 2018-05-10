module.exports = {
	dist: {
		options: {
			config: '<%= paths.helpers %>/tasks/csscomb.config.json'
		},
		expand: true,
		cwd: '<%= paths.app %>/scss/',
		src: ['**/*.scss', '!utils/**/*.scss', '!icons/**/*.scss'],
		dest: '<%= paths.app %>/scss/'
	}
};