module.exports = {
	scss: {
		options: {
			configFile: '<%= paths.helpers %>/task-configs/stylelint.config.js',
			format: 'scss'
		},
		src: [
			'<%= paths.src %>/scss/**/*.scss',
			'!<%= paths.src %>/scss/styles.tmp.scss'
		]
	}
};