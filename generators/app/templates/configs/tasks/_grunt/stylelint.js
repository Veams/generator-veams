module.exports = {
	scss: {
		options: {
			configFile: '<%= paths.config %>/tasks/linting/stylelint.config.js',
			format: 'scss'
		},
		src: [
			'<%= paths.src %>/shared/styles/**/*.scss',
			'<%= paths.src %>/shared/components/**/*.scss',
			'<%= paths.src %>/shared/utilities/**/*.scss',
			'<%= paths.src %>/core/**/*.scss',
			'<%= paths.src %>/features/**/*.scss',
			'!<%= paths.src %>/app.scss'
		]
	}
};