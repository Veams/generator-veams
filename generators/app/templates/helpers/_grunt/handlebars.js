module.exports = {
	compile: {
		options: {
			namespace: "App.Templates",
			node: false,
			processName: function (filePath) {
				var pathParts = filePath.split('/');
				var fileNameExt = pathParts[pathParts.length - 1];
				var fileName = fileNameExt.split('.')[0];
				fileName = fileName.replace(/-/g, '').toUpperCase();
				return fileName;
			},
			commonjs: true
		},
		files: {
			"<%= paths.src %>/js/templates/templates.js": ["<%= paths.src %>/js/modules/**/*.hbs"]
		}
	}
};
