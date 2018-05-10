module.exports = {
	dist: {
		options: {
			destination: '<%= paths.dest %>/jsdocs',
			template: "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
			configure: "<%= paths.helpers %>/tasks/jsdoc.config.json"
		},
		src: [
			'<%= paths.app %>/shared/scripts/**/*.js',
			'<%= paths.app %>/shared/components/**/*.js',
			'<%= paths.app %>/shared/utilities/**/*.js'
		]
	}
};