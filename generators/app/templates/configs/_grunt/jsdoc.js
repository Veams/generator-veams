module.exports = {
	dist: {
		options: {
			destination: '<%= paths.dev %>/jsdocs',
			template: "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
			configure: "<%= paths.helpers %>/tasks/jsdoc.config.json"
		},
		src: [
			'<%= paths.src %>/shared/scripts/**/*.js',
			'<%= paths.src %>/shared/components/**/*.js',
			'<%= paths.src %>/shared/utilities/**/*.js'
		]
	}
};