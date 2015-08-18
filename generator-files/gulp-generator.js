exports.questions = function () {
	return {
		when: function (answers) {
			return answers.taskRunner
				&& answers.taskRunner.length
				&& answers.taskRunner.indexOf('gulp') !== -1;
		},
		name: 'gulpModules',
		type: 'checkbox',
		message: 'Which gulp modules do you want to use?',
		choices: [
			// {name: 'gulp-arialinter'},
			// {name: 'browserify'},
			{name: 'gulp-autoprefixer', checked: true},
			{name: 'gulp-bless'},
			{name: 'gulp-combine-mq', checked: true},
			{name: 'gulp-htmlmin'},
			{name: 'gulp-iconify'},
			// {name: 'gulp-jsdoc'},
			{name: 'gulp-jshint'},
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
	// Copy standard files
	this.template('Gulpfile.js.ejs', 'Gulpfile.js');
	this.mkdir('helpers/_gulp');
	this.template('helpers/_gulp/_clean.js.ejs', 'helpers/_gulp/clean.js');
	this.template('helpers/_gulp/_styles.js.ejs', 'helpers/_gulp/styles.js');
	// if .gulpModules.indexOf('gulp-htmlhint') !== -1 || this.gulpModules.indexOf()
	this.template('helpers/_gulp/_hinting.js.ejs', 'helpers/_gulp/hinting.js');
	this.template('helpers/_gulp/_html.js.ejs', 'helpers/_gulp/html.js');
	this.template('helpers/_gulp/_copy.js.ejs', 'helpers/_gulp/copy.js');

	if (!this.gulpModules && !this.gulpModules.length) return;

	// Add scripts task
	if (this.gulpModules.indexOf('gulp-requirejs-optimize') !== -1 ||
		this.gulpModules.indexOf('gulp-uglify') !== -1 && this.gulpModules.indexOf('browserify') === -1 ||
		this.gulpModules.indexOf('gulp-requirejs-optimize') !== -1 && this.gulpModules.indexOf('gulp-uglify') !== -1) {
		this.template('helpers/_gulp/_scripts.require.js.ejs', 'helpers/_gulp/scripts.js');
	} else if (this.gulpModules.indexOf('browserify') !== -1 ||
		this.gulpModules.indexOf('browserify') !== -1 && this.gulpModules.indexOf('gulp-uglify') !== -1) {
		this.template('helpers/_gulp/_scripts.browserify.js.ejs', 'helpers/_gulp/scripts.js');
	}

	// Gulp modules are splitted up in separate files and modules
	if (this.gulpModules.indexOf('gulp-iconify') != -1 || this.gulpModules.indexOf('gulp-svg-sprite') != -1) {
		this.template('helpers/_gulp/_icons.js.ejs', 'helpers/_gulp/icons.js');
	}
};