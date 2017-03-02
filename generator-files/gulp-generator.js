'use strict';

exports.questions = function () {
	return {
		when: function (answers) {
			return answers.taskRunner
				&& answers.taskRunner.length
				&& answers.taskRunner.indexOf('gulp') !== -1;
		},
		name: 'gulpModules',
		type: 'checkbox',
		message: 'Which Gulp-Plugins do you want to use?',
		choices: [
			// {name: 'gulp-arialinter'},
			{name: 'browserify'},
			{name: 'gulp-autoprefixer', checked: true},
			{name: 'gulp-bless'},
			{name: 'gulp-combine-mq', checked: true},
			{name: 'gulp-htmlmin'},
			{name: 'gulp-iconify'},
			// {name: 'gulp-jsdoc'},
			// {name: 'gulp-modulizr'},
			{name: 'gulp-requirejs-optimize'},
			// {name: 'gulp-responsive'},
			// {name: 'gulp-svg-sprite', checked: true},
			{name: 'gulp-uglify'}
		],
		default: this.config.get('gulpModules')
	};
};

exports.setup = function () {
	this.gulpModules = this.config.get('gulpModules') || [];
};

exports.scaffold = function () {
	if (!this.gulpModules || !this.gulpModules.length) {
		delete this.pkgFile['devDependencies']['jshint-stylish'];
	}

	// Add scripts task
	if (this.gulpModules.indexOf('gulp-requirejs-optimize') !== -1 ||
		this.gulpModules.indexOf('gulp-uglify') !== -1 && this.gulpModules.indexOf('browserify') === -1 ||
		this.gulpModules.indexOf('gulp-requirejs-optimize') !== -1 && this.gulpModules.indexOf('gulp-uglify') !== -1) {
		this.fs.copyTpl(
			this.templatePath('helpers/_gulp/_scripts.require.js.ejs'),
			'helpers/_gulp/scripts.js',
			this
		);
	} else if (this.gulpModules.indexOf('browserify') !== -1) {
		this.fs.copyTpl(
			this.templatePath('helpers/_gulp/_scripts.browserify.js.ejs'),
			'helpers/_gulp/scripts.js',
			this
		);
	}

	// Gulp modules are splitted up in separate files and modules
	if (this.gulpModules.indexOf('gulp-iconify') != -1 || this.gulpModules.indexOf('gulp-svg-sprite') != -1) {
		this.fs.copyTpl(
			this.templatePath('helpers/_gulp/_icons.js.ejs'),
			'helpers/_gulp/icons.js',
			this
		);
	}

	// Deletion in package.json
	if (this.gulpModules.indexOf('browserify') === -1) {
		delete this.pkgFile['devDependencies']['browserify'];
		delete this.pkgFile['devDependencies']['vinyl-buffer'];
		delete this.pkgFile['devDependencies']['vinyl-source-stream'];
		delete this.pkgFile['devDependencies']['watchify'];
	}
	if (this.gulpModules.indexOf('gulp-autoprefixer') === -1 && this.cssLibs.indexOf('lost-grid') === -1) delete this.pkgFile['devDependencies']['gulp-postcss'];
	if (this.gulpModules.indexOf('gulp-bless') === -1) delete this.pkgFile['devDependencies']['gulp-bless'];
	if (this.gulpModules.indexOf('gulp-combine-mq') === -1) delete this.pkgFile['devDependencies']['gulp-combine-mq'];
	if (this.gulpModules.indexOf('gulp-htmlmin') === -1) delete this.pkgFile['devDependencies']['gulp-htmlmin'];
	if (this.gulpModules.indexOf('gulp-iconify') === -1) delete this.pkgFile['devDependencies']['gulp-iconify'];
	if (this.gulpModules.indexOf('gulp-modulizr') === -1) delete this.pkgFile['devDependencies']['gulp-modulizr'];
	if (this.gulpModules.indexOf('gulp-requirejs-optimize') === -1) delete this.pkgFile['devDependencies']['gulp-requirejs-optimize'];
	if (this.gulpModules.indexOf('gulp-responsive') === -1) delete this.pkgFile['devDependencies']['gulp-responsive'];
	if (this.gulpModules.indexOf('gulp-svg-sprite') === -1) delete this.pkgFile['devDependencies']['gulp-svg-sprite'];
	if (this.gulpModules.indexOf('gulp-uglify') === -1) delete this.pkgFile['devDependencies']['gulp-uglify'];
};