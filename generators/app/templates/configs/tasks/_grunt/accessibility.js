module.exports = {
	options: {
		accessibilityLevel: 'WCAG2A'
	},
	test: {
		files: [
			{
				expand: true,
				cwd: '<%= paths.app %>/',
				src: ['*.html'],
				dest: '<%= paths.helpers %>/reports/accessibility',
				ext: '-report.txt'
			}
		]
	}
};