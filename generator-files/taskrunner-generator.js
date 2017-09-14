'use strict';

let gruntId = 'grunt';
let webpackId = 'webpack';

exports.questions = function (obj) {
	let object = obj || {};
	object.defaults = object.defaults !== false;

	return {
		type: 'list',
		name: 'taskRunner',
		message: 'Which task runner do you want to use?',
		choices: [
			{
				name: 'Grunt',
				value: gruntId,
				checked: object.defaults
			},
			{
				name: 'Webpack',
				value: webpackId,
				checked: object.defaults
			}
		],
		default: this.config.get('taskRunner')
	};
};

exports.setup = function () {
	this.taskRunner = this.config.get('taskRunner') || [];
};

exports.scaffold = function () {
	if (this.taskRunner.indexOf(gruntId) === -1) {
		delete this.pkgFile['devDependencies']['grunt'];
		delete this.pkgFile['devDependencies']['grunt-chokidar'];
		delete this.pkgFile['devDependencies']['grunt-concurrent'];
		delete this.pkgFile['devDependencies']['grunt-contrib-clean'];
		delete this.pkgFile['devDependencies']['grunt-contrib-cssmin'];
		delete this.pkgFile['devDependencies']['grunt-combine-mq'];
		delete this.pkgFile['devDependencies']['grunt-express-server'];
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

		if (this.taskRunner.indexOf(webpackId) !== -1) {
			delete this.pkgFile['devDependencies']['grunt-chokidar'];
			delete this.pkgFile['devDependencies']['grunt-concurrent'];
			delete this.pkgFile['devDependencies']['grunt-contrib-clean'];
			delete this.pkgFile['devDependencies']['grunt-contrib-cssmin'];
			delete this.pkgFile['devDependencies']['grunt-combine-mq'];
			delete this.pkgFile['devDependencies']['grunt-express-server'];
			delete this.pkgFile['devDependencies']['grunt-newer'];
			delete this.pkgFile['devDependencies']['grunt-sync'];
			delete this.pkgFile['devDependencies']['grunt-sass-globber'];
			delete this.pkgFile['devDependencies']['grunt-sass'];
		} else {
			this.pkgFile['scripts'] = {
				"test": "grunt test",
				"start": "grunt serve",
				"build": "grunt dist"
			};

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
				this.templatePath(this.generatorGruntPath + 'express.js'),
				this.gruntPath + 'express.js',
				this
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
	}
};