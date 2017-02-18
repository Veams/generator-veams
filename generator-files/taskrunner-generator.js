'use strict';

let gruntId = 'grunt';
let gulpId = 'gulp';

exports.questions = function (obj) {
	let object = obj || {};
	object.defaults = object.defaults !== false;

	return {
		type: 'checkbox',
		name: 'taskRunner',
		message: 'Which task runner do you want to use?',
		choices: [
			{
				name: 'Grunt',
				value: gruntId,
				checked: object.defaults
			},
			{
				name: 'Gulp',
				value: gulpId
			}
		],
		validate: function (answer) {
			if (answer.length === 0) {
				return false;
			} else {
				return true;
			}
		},
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

		this.pkgFile['scripts'] = {
			"test": "gulp test",
			"start": "gulp serve",
			"build": "gulp dist"
		};
	} else {
		this.fs.copyTpl(
			this.templatePath('Gruntfile.js.ejs'),
			'Gruntfile.js',
			this
		);

		if (this.taskRunner.indexOf(gulpId) !== -1) {
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

	if (this.taskRunner.indexOf(gulpId) === -1) {
		delete this.pkgFile['devDependencies']['browser-sync'];
		delete this.pkgFile['devDependencies']['del'];
		delete this.pkgFile['devDependencies']['require-dir'];
		delete this.pkgFile['devDependencies']['sass-globber'];
		delete this.pkgFile['devDependencies']['gulp'];
		delete this.pkgFile['devDependencies']['gulp-load'];
		delete this.pkgFile['devDependencies']['gulp-load-plugins'];
		delete this.pkgFile['devDependencies']['gulp-filesize'];
		delete this.pkgFile['devDependencies']['gulp-grunt'];
		delete this.pkgFile['devDependencies']['gulp-htmlhint'];
		delete this.pkgFile['devDependencies']['gulp-minify-css'];
		delete this.pkgFile['devDependencies']['gulp-minify-filesize'];
		delete this.pkgFile['devDependencies']['gulp-rename'];
		delete this.pkgFile['devDependencies']['gulp-notify'];
		delete this.pkgFile['devDependencies']['gulp-sass'];
		delete this.pkgFile['devDependencies']['gulp-sequence'];
		delete this.pkgFile['devDependencies']['gulp-sourcemaps'];
	} else {
		// Copy standard files
		this.fs.copyTpl(
			this.templatePath('Gulpfile.js.ejs'),
			'Gulpfile.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath('helpers/_gulp/_clean.js.ejs'),
			'helpers/_gulp/clean.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath('helpers/_gulp/_styles.js.ejs'),
			'helpers/_gulp/styles.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath('helpers/_gulp/_html.js.ejs'),
			'helpers/_gulp/html.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath('helpers/_gulp/_copy.js.ejs'),
			'helpers/_gulp/copy.js',
			this
		);
	}
};