const fs = require('fs-extra');
const config = require('../../config').options;

module.exports = function (grunt) {
	grunt.registerTask('iconbuilder', function () {
		let iconFontName = 'icons-font';
		
		grunt.task.requires('webfont');

		grunt.log.writeln('Reading ' + config.paths.tmp + '/icons/' + iconFontName + '.html');
		let content = fs.readFileSync(config.paths.tmp + '/icons/' + iconFontName + '.html', 'utf-8');

		fs.writeFileSync(config.paths.partials + '/_global/icons.hbs', content);
		grunt.log.ok(['Writing of ' + config.paths.partials + '/icons.hbs successful.']);

		fs.copySync(config.paths.tmp + '/fonts/_' + iconFontName + '.scss', config.paths.scss + '/icons/_' + iconFontName + '.scss');
		grunt.log.ok(['Copying of ' + config.paths.tmp + '/fonts/_' + iconFontName + '.scss successful.']);

		fs.copySync(config.paths.tmp + '/fonts/', config.paths.src + '/assets/fonts');
		grunt.log.ok(['Copying of fonts successful.']);
	})
};