module.exports = {
	js: {
		options: {
			includeRegexp: /^\/\/\s*import\s+['"]?([^'"]+)['"]?\s*$/,
			duplicates: false,
			debug: false
		},
		files: [{
			cwd: '<%= paths.src %>/js/',
			src: '**/*.js',
			dest: '<%= paths.dev %>/js/'
		}]
	}
};