const config = require('./config');

module.exports = function scaffold() {
	if (this.jsLibs.indexOf(config.reactId) == -1) {
		delete this.pkgFile['dependencies'][config.reactId];
	}

	if (this.jsLibs.indexOf(config.jqueryId) == -1) {
		delete this.pkgFile['dependencies'][config.jqueryId];
	}

	if (this.jsLibs.indexOf(config.veamsQueryId) == -1) {
		delete this.pkgFile['dependencies'][config.veamsQueryId];
	}

	// Add JS files for libraries
	if (this.gruntModules.indexOf('grunt-browserify') !== -1) {
		this.fs.copyTpl(
			this.templatePath('src/_app.browserify.js.ejs'),
			'src/app.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath('src/core/scripts/_core.browserify.js.ejs'),
			'src/core/scripts/core.js',
			this
		);
	}
};