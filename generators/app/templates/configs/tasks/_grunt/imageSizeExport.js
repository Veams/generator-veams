module.exports = {
	folder: {
		options: {
			path: '<%= paths.src %>/assets/img/temp/pictures/**/*.jpg',
			output: '<%= paths.src %>/assets/img/pictures.json',
			categorizeBy: 'folders',
			breakpointDelimiter: '--'
		}
	}
};