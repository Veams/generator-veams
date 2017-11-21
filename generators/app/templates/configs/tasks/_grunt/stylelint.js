module.exports = {
	scss: {
		options: {
			configFile: '<%= paths.helpers %>/tasks/stylelint.config.js',
			format: 'scss'
		},
		src: [
			'<%= paths.src %>/shared/styles/**/*.scss',
			'<%= paths.src %>/shared/components/**/*.scss',
			'<%= paths.src %>/shared/utilities/**/*.scss',
			'<%= paths.src %>/shared/layouts/**/*.scss',
			'!<%= paths.src %>/scss/styles.tmp.scss'
		]
	}
};