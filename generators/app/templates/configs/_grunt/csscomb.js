module.exports = {
	dist: {
		options: {
			config: '<%= paths.helpers %>/tasks/csscomb.config.json'
		},
		expand: true,
		cwd: '<%= paths.src %>/scss/',
		src: ['**/*.scss', '!utils/**/*.scss', '!icons/**/*.scss'],
		dest: '<%= paths.src %>/scss/'
	}
};