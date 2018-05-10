module.exports = {
	scss: {
		options: {
			configFile: '<%= paths.config %>/tasks/linting/stylelint.config.js',
			format: 'scss'
		},
		src: [
			'<%= paths.docs %>/**/*.scss',
			'<%= paths.app %>/shared/styles/**/*.scss',
			'<%= paths.app %>/shared/components/**/*.scss',
			'<%= paths.app %>/shared/utilities/**/*.scss',
			'<%= paths.app %>/core/**/*.scss',
			'<%= paths.app %>/features/**/*.scss',
			'!<%= paths.app %>/app.scss'
		]
	}
};