'use strict';

exports.scaffold = function () {
	// Gulp and Grunt packages
	if (this.gulpModules.indexOf('gulp-autoprefixer') === -1 && this.gruntModules.indexOf('grunt-autoprefixer') === -1) {
		delete this.pkgFile['devDependencies']['autoprefixer'];
	}

	// PostCSS
	if (this.gruntModules.indexOf('grunt-autoprefixer') === -1 && this.cssLibs.indexOf('lost-grid') === -1) {
		delete this.pkgFile['devDependencies']['grunt-postcss'];
	}

	if (this.cssLibs.length === 0 && this.jsLibs.length === 0) {
		this.bowerFile['dependencies'] = {};
	}

	// Package handling of JS setup
	if (this.gruntModules.indexOf('grunt-browserify') === -1) {
		delete this.pkgFile['devDependencies']['aliasify'];
		delete this.pkgFile['devDependencies']['babelify'];
		delete this.pkgFile['devDependencies']['browserify'];
		delete this.pkgFile['devDependencies']['babel-preset-es2015'];
		delete this.pkgFile['devDependencies']['babel-preset-stage-0'];
		delete this.pkgFile['devDependencies']['babel-plugin-add-module-exports'];
		this.pkgFile['dependencies'] = {};
	}
};