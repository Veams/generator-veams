module.exports = {
	options: {
		template: {
			src: '<%= paths.helper %>/templates/styleguide-template/'
		},
		name: 'Style Guide',
		framework: {
			name: 'kss'
		}
	},
	all: {
		files: [
			{
				'<%= paths.dev %>/styleguide': '<%= paths.src %>/scss/**/*.scss'
			}
		]
	}
};