'use strict';

const config = require('./config');

module.exports = function scaffold() {
	if (this.taskRunner !== config.gruntId) {
		delete this.pkgFile['devDependencies']['grunt'];
		delete this.pkgFile['devDependencies']['grunt-browserify'];
		delete this.pkgFile['devDependencies']['grunt-chokidar'];
		delete this.pkgFile['devDependencies']['grunt-concurrent'];
		delete this.pkgFile['devDependencies']['grunt-contrib-clean'];
		delete this.pkgFile['devDependencies']['grunt-contrib-cssmin'];
		delete this.pkgFile['devDependencies']['grunt-combine-mq'];
		delete this.pkgFile['devDependencies']['grunt-newer'];
		delete this.pkgFile['devDependencies']['grunt-sync'];
		delete this.pkgFile['devDependencies']['grunt-sass-globber'];
		delete this.pkgFile['devDependencies']['grunt-sass'];
		delete this.pkgFile['devDependencies']['gulp-grunt'];
		delete this.pkgFile['devDependencies']['jit-grunt'];
		delete this.pkgFile['devDependencies']['load-grunt-configs'];
		delete this.pkgFile['devDependencies']['time-grunt'];
	} else {
		this.fs.copyTpl(
			this.templatePath('Gruntfile.js.ejs'),
			'Gruntfile.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_clean.js.ejs'),
			this.gruntPath + 'clean.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_concurrent.js.ejs'),
			this.gruntPath + 'concurrent.js',
			this
		);
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'cssmin.js'),
			this.gruntPath + 'cssmin.js'
		);
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_sync.js.ejs'),
			this.gruntPath + 'sync.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_sassGlobber.js.ejs'),
			this.gruntPath + 'sassGlobber.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_sass.js.ejs'),
			this.gruntPath + 'sass.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_watch.js.ejs'),
			this.gruntPath + 'chokidar.js',
			this
		);
	}
};