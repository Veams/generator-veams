var gruntId = 'grunt';
var gulpId = 'gulp';

exports.questions = function (obj) {
	var object = obj || {};
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
	if (this.taskRunner.indexOf(gruntId) == -1) {
		delete this.pkgFile['devDependencies']['grunt'];
		delete this.pkgFile['devDependencies']['grunt-concurrent'];
		delete this.pkgFile['devDependencies']['grunt-contrib-watch'];
		delete this.pkgFile['devDependencies']['grunt-contrib-clean'];
		delete this.pkgFile['devDependencies']['grunt-contrib-cssmin'];
		delete this.pkgFile['devDependencies']['grunt-express'];
		delete this.pkgFile['devDependencies']['grunt-sync'];
		delete this.pkgFile['devDependencies']['grunt-sass-globber'];
		delete this.pkgFile['devDependencies']['grunt-sass'];
		delete this.pkgFile['devDependencies']['jit-grunt'];
		delete this.pkgFile['devDependencies']['time-grunt'];
		delete this.pkgFile['devDependencies']['gulp-grunt'];
	} else {
		this.mkdir('helpers/_grunt');
		this.template('Gruntfile.js.ejs', 'Gruntfile.js');

		if (this.taskRunner.indexOf(gulpId) !== -1) {
			this.pkgFile['scripts'] = {
				"test": "gulp test",
				"start": "gulp start",
				"build": "gulp build"
			};
		} else {
			this.pkgFile['scripts'] = {
				"test": "grunt test",
				"start": "grunt start",
				"build": "grunt build"
			};

			this.template(this.generatorGruntPath + '_clean.js.ejs', this.gruntPath + 'clean.js');
			this.template(this.generatorGruntPath + '_concurrent.js.ejs', this.gruntPath + 'concurrent.js');
			this.copy(this.generatorGruntPath + 'cssmin.js', this.gruntPath + 'cssmin.js');
			this.template(this.generatorGruntPath + 'express.js', this.gruntPath + 'express.js');
			this.template(this.generatorGruntPath + '_sync.js.ejs', this.gruntPath + 'sync.js');
			this.template(this.generatorGruntPath + '_sassGlobber.js.ejs', this.gruntPath + 'sassGlobber.js');
			this.template(this.generatorGruntPath + '_sass.js.ejs', this.gruntPath + 'sass.js');
			this.template(this.generatorGruntPath + '_watch.js.ejs', this.gruntPath + 'watch.js');
		}
	}

	if (this.taskRunner.indexOf(gulpId) == -1) {
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
		delete this.pkgFile['devDependencies']['gulp-notify'];
		delete this.pkgFile['devDependencies']['gulp-sass'];
		delete this.pkgFile['devDependencies']['gulp-sequence'];
		delete this.pkgFile['devDependencies']['gulp-sourcemaps'];
	} else {
		// Copy standard files
		this.template('Gulpfile.js.ejs', 'Gulpfile.js');
		this.mkdir('helpers/_gulp');
		this.template('helpers/_gulp/_clean.js.ejs', 'helpers/_gulp/clean.js');
		this.template('helpers/_gulp/_styles.js.ejs', 'helpers/_gulp/styles.js');
		// if .gulpModules.indexOf('gulp-htmlhint') !== -1 || this.gulpModules.indexOf()
		this.template('helpers/_gulp/_hinting.js.ejs', 'helpers/_gulp/hinting.js');
		this.template('helpers/_gulp/_html.js.ejs', 'helpers/_gulp/html.js');
		this.template('helpers/_gulp/_copy.js.ejs', 'helpers/_gulp/copy.js');
	}
};