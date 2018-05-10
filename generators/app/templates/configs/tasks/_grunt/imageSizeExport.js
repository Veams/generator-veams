module.exports = {
	folder: {
		options: {
			path: '<%= paths.app %>/assets/img/temp/pictures/**/*.jpg',
			output: '<%= paths.app %>/assets/img/pictures.json',
			categorizeBy: 'folders',
			breakpointDelimiter: '--'
		}
	}
};