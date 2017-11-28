'use strict';

exports.scaffold = function () {
	// Gulp and Grunt packages
	if (this.gruntModules.indexOf('grunt-autoprefixer') === -1) {
		delete this.pkgFile['devDependencies']['autoprefixer'];
	}

	// PostCSS
	if (this.gruntModules.indexOf('grunt-autoprefixer') === -1 && this.cssLibs.indexOf('lost-grid') === -1) {
		delete this.pkgFile['devDependencies']['grunt-postcss'];
	}

	// Package handling of JS setup
	if (this.taskRunner !== 'grunt') {
		delete this.pkgFile['devDependencies']['aliasify'];
		delete this.pkgFile['devDependencies']['babelify'];
		delete this.pkgFile['devDependencies']['browserify'];
	}
};