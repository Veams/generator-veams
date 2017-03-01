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

	// Bower handling of JS setup
	if (this.gruntModules.indexOf('grunt-browserify') !== -1 ||
		this.gulpModules.indexOf('browserify') !== -1 ||
		this.taskRunner.indexOf('gulp') !== -1 && this.gulpModules.indexOf('gulp-requirejs-optimize') === -1 ||
		this.taskRunner.indexOf('grunt') !== -1 && this.gruntModules.indexOf('grunt-contrib-requirejs') === -1) {
		delete this.bowerFile['dependencies']['almond'];
		delete this.bowerFile['dependencies']['backbone'];
		delete this.bowerFile['dependencies']['exoskeleton'];
		delete this.bowerFile['dependencies']['requirejs'];
		delete this.bowerFile['dependencies']['requirejs-text'];
		delete this.bowerFile['dependencies']['veams-query'];
	}

	if (this.cssLibs.length === 0 && this.jsLibs.length === 0) {
		this.bowerFile['dependencies'] = {};
	}

	// Package handling of JS setup
	if (this.gruntModules.indexOf('grunt-browserify') === -1 && this.gulpModules.indexOf('browserify') === -1) {
		delete this.pkgFile['devDependencies']['aliasify'];
		delete this.pkgFile['devDependencies']['babelify'];
		delete this.pkgFile['devDependencies']['browserify'];
		delete this.pkgFile['devDependencies']['babel-preset-es2015'];
		delete this.pkgFile['devDependencies']['babel-preset-stage-0'];
		this.pkgFile['dependencies'] = {};
	}
};