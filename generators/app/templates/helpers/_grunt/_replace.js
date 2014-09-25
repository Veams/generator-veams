module.exports = {<% if (modules && modules.length > 0) { if (modules.indexOf('grunt-dr-svg-sprites') != -1) { %>
	datasvg: {
		src: ['<%= paths.src %>/scss/icons/_icons-data-svg.scss'],             // source files array (supports minimatch)
		dest: '<%= paths.src %>/scss/icons/_icons-data-svg.scss',               // destination directory or file
		replacements: [
			{
				from: '%icon-',                                                 // string replacement
				to: '%icon-data-svg-'
			}
		]
	},
	datapng: {
		src: ['<%= paths.src %>/scss/icons/_icons-data-png.scss'],             // source files array (supports minimatch)
		dest: '<%= paths.src %>/scss/icons/_icons-data-png.scss',               // destination directory or file
		replacements: [
			{
				from: '%icon-',                                                 // string replacement
				to: '%icon-data-png-'
			}
		]
	},
	fallback: {
		src: ['<%= paths.src %>/scss/icons/_icons-fallback.scss'],             // source files array (supports minimatch)
		dest: '<%= paths.src %>/scss/icons/_icons-fallback.scss',               // destination directory or file
		replacements: [
			{
				from: '%icon-',                                                 // string replacement
				to: '%icon-png-'
			}
		]
	},
	url: {
		src: ['<%= paths.src %>/scss/icons/_icons-fallback.scss'],             // source files array (supports minimatch)
		dest: '<%= paths.src %>/scss/icons/_icons-fallback.scss',               // destination directory or file
		replacements: [
			{
				from: '../../assets/img/',                                      // string replacement
				to: '../img/'
			}
		]
	}<% if (modules && modules.length > 0) { if (modules.indexOf('grunt-dr-svg-sprites') != -1) { %>,<% }} %><% }} %><% if (modules && modules.length > 0) { if (modules.indexOf('grunt-dr-svg-sprites') != -1) { %>
	spriteUrl: {
		src: ['<%= paths.src %>/scss/icons/_icons-sprite.scss'],             // source files array (supports minimatch)
		dest: '<%= paths.src %>/scss/icons/_icons-sprite.scss',               // destination directory or file
		replacements: [
			{
				from: '../../assets/img/',                                      // string replacement
				to: '../img/'
			}
		]
	}<% }} %>
};