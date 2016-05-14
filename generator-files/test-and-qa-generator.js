var pg = require('./../lib/helpers.js');

var jscsId = 'jscs';
var htmlHintId = 'hintingHTML';
var jsHintId = 'hintingJS';
var webdriverId = 'webdriver';
var karmaId = 'karma';

exports.questions = function () {
	var qaLibsId = 'testAndQALibs';
	var qaLibsQuestion = 'Which Testing and QA Tools do you want add?';
	var choices = [
		{
			name: 'JavaScript Code Style (jscs)',
			value: jscsId,
			checked: true
		},
		{
			name: 'Hint your HTML (HTMLHint)',
			value: htmlHintId,
			checked: true
		},
		{
			name: 'Hint your JavaScript (JSHint)',
			value: jsHintId,
			checked: true
		}/*,
		 {
		 name: 'Unit Testing (karma, mocha, sinon, chai)',
		 value: karmaId,
		 checked: false
		 }*/
	];

	return [
		{
			name: 'testAndQA',
			type: 'confirm',
			message: 'Would you like to add Testing and QA Tools?',
			default: this.config.get('testAndQA')
		},
		{
			when: function (answers) {
				return answers.testAndQA && answers.taskRunner.indexOf('grunt') === -1;
			},
			name: qaLibsId,
			type: 'checkbox',
			message: qaLibsQuestion,
			choices: choices,
			default: this.config.get(qaLibsId)
		},
		{
			when: function (answers) {
				return answers.testAndQA && answers.taskRunner.indexOf('grunt') !== -1;
			},
			name: qaLibsId,
			type: 'checkbox',
			message: qaLibsQuestion,
			choices: choices.concat([
				{
					name: 'E2E - End to End (webdriver)',
					value: webdriverId,
					checked: true
				}
			]),
			default: this.config.get(qaLibsId)
		}
	];
};

exports.setup = function () {
	this.testAndQALibs = this.config.get('testAndQALibs') || [];

	pg.definePaths.bind(this);
};

exports.scaffold = function () {
	if (!this.testAndQALibs && !this.testAndQALibs.length) return;


	if (this.testAndQALibs.indexOf(jscsId) !== -1) {
		this.copy(
			this.generatorHelperPath + 'task-configs/jscs.airbnb.json',
			this.helperPath + 'task-configs/jscs.airbnb.json'
		);

		if (this.taskRunner.indexOf('grunt') !== -1 && this.taskRunner.indexOf('gulp') === -1) {
			this.copy(
				this.generatorHelperPath + '_grunt/jscs.js',
				this.helperPath + '_grunt/jscs.js'
			);
			delete this.pkgFile['devDependencies']['gulp-jscs'];
		} else {
			delete this.pkgFile['devDependencies']['grunt-jscs'];
		}

		if (this.taskRunner.indexOf('gulp') !== -1) {
			this.copy(
				this.generatorGulpPath + '_testing.js.ejs',
				this.gulpPath + 'testing.js'
			);
		}
	} else {
		delete this.pkgFile['devDependencies']['grunt-jscs'];
		delete this.pkgFile['devDependencies']['gulp-jscs'];
	}

	if (this.testAndQALibs.indexOf(htmlHintId) !== -1) {
		this.copy(
			this.generatorHelperPath + 'task-configs/.htmlhintrc',
			this.helperPath + 'task-configs/.htmlhintrc'
		);

		if (this.taskRunner.indexOf('grunt') !== -1 && this.taskRunner.indexOf('gulp') === -1) {
			this.copy(
				this.generatorGruntPath + 'htmlhint.js',
				this.gruntPath + 'htmlhint.js'
			);
			delete this.pkgFile['devDependencies']['gulp-htmlhint'];
		} else {
			delete this.pkgFile['devDependencies']['grunt-htmlhint'];
		}
	} else {
		delete this.pkgFile['devDependencies']['gulp-htmlhint'];
		delete this.pkgFile['devDependencies']['grunt-htmlhint'];
	}

	if (this.testAndQALibs.indexOf(jsHintId) != -1) {
		this.copy(
			this.generatorHelperPath + 'task-configs/.jshintrc',
			this.helperPath + 'task-configs/.jshintrc'
		);

		if (this.taskRunner.indexOf('grunt') !== -1 && this.taskRunner.indexOf('gulp') === -1) {
			this.copy(
				this.generatorGruntPath + 'jshint.js',
				this.gruntPath + 'jshint.js'
			);
			delete this.pkgFile['devDependencies']['gulp-jshint'];
		} else {
			delete this.pkgFile['devDependencies']['grunt-jshint'];
		}
	} else {
		delete this.pkgFile['devDependencies']['gulp-jshint'];
		delete this.pkgFile['devDependencies']['grunt-jshint'];
	}

	if (this.testAndQALibs.indexOf(htmlHintId) !== -1 || this.testAndQALibs.indexOf(jsHintId) !== -1) {
		if (this.taskRunner.indexOf('gulp') !== -1) {
			this.copy(
				this.generatorGulpPath + '_hinting.js.ejs',
				this.gulpPath + 'hinting.js'
			);
		}
	}

	if (this.testAndQALibs.indexOf(webdriverId) !== -1) {

		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.copy(
				this.generatorHelperPath + '_grunt/webdriver.js',
				this.helperPath + '_grunt/webdriver.js'
			);
			// create demo document
			this.template('test/webdriver.html.ejs', 'test/helpers/html/test.html');
			// create demo document
			this.copy('test/demo.test.js', 'test/helpers/html/demo.test.js');
			// create demo spec
			this.copy('test/demo.spec.js', 'test/spec/e2e/demo.spec.js');
		} else {
			delete this.pkgFile['devDependencies']['grunt-webdriver'];
		}
	} else {
		delete this.pkgFile['devDependencies']['grunt-webdriver'];
	}

	if (this.testAndQALibs.indexOf(karmaId) !== -1) {

		if (this.taskRunner.indexOf('grunt') !== -1) {
			//this.copy(this.generatorHelperPath + '_grunt/karma.js', this.helperPath + '_grunt/karma.js');
		}
	}
};