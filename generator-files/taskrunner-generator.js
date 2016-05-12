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
		delete this.pkgFile['devDependencies']['grunt-sync'];
		delete this.pkgFile['devDependencies']['grunt-express'];
		delete this.pkgFile['devDependencies']['grunt-sass-globber'];
		delete this.pkgFile['devDependencies']['jit-grunt'];
		delete this.pkgFile['devDependencies']['time-grunt'];
		delete this.pkgFile['devDependencies']['gulp-grunt'];
	} else {
		if (this.taskRunner.indexOf(gulpId) !== -1) {
			this.pkgFile['scripts'] = {
				"test": "gulp test",
				"start": "gulp start",
				"build": "gulp build"
			}
		} else {
			this.pkgFile['scripts'] = {
				"test": "grunt test",
				"start": "grunt start",
				"build": "grunt build"
			}
		}
	}

	if (this.taskRunner.indexOf(gulpId) == -1) {
		delete this.pkgFile['devDependencies']['browser-sync'];
		delete this.pkgFile['devDependencies']['del'];
		delete this.pkgFile['devDependencies']['require-dir'];
		delete this.pkgFile['devDependencies']['sass-globber'];
		delete this.pkgFile['devDependencies']['gulp'];
		delete this.pkgFile['devDependencies']['gulp-filesize'];
		delete this.pkgFile['devDependencies']['gulp-grunt'];
		delete this.pkgFile['devDependencies']['gulp-minify-css'];
		delete this.pkgFile['devDependencies']['gulp-minify-filesize'];
		delete this.pkgFile['devDependencies']['gulp-notify'];
		delete this.pkgFile['devDependencies']['gulp-sequence'];
	}
};