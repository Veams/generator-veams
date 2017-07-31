'use strict';

const helpers = require('./../lib/helpers.js');
const jscsId = 'jscs';
const htmlHintId = 'hintingHTML';
const jsHintId = 'hintingJS';
const sasslintId = 'stylelint';
const webdriverId = 'webdriver';
const karmaId = 'karma';

exports.questions = function () {
	const qaLibsId = 'testAndQALibs';
	const qaLibsQuestion = 'Which Testing and QA Tools do you want add?';
	const choices = [
		{
			name: 'JavaScript Code Style (jscs)',
			value: jscsId,
			checked: false
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
		},
		{
			name: 'Lint your Sass (Stylelint)',
			value: sasslintId,
			checked: true
		}
		/*{
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

	helpers.definePaths.bind(this);
};

exports.scaffold = function () {

	/**
	 * JSCS Lint
	 */
	if (this.testAndQALibs.indexOf(jscsId) !== -1) {
		this.fs.copy(
			this.templatePath(this.generatorHelperPath + 'task-configs/jscs.airbnb.json'),
			this.helperPath + 'task-configs/jscs.airbnb.json'
		);

		if (this.taskRunner.indexOf('grunt') !== -1 && this.taskRunner.indexOf('gulp') === -1) {
			this.fs.copy(
				this.templatePath(this.generatorHelperPath + '_grunt/jscs.js'),
				this.gruntPath + 'jscs.js'
			);
			delete this.pkgFile['devDependencies']['gulp-jscs'];
		} else {
			delete this.pkgFile['devDependencies']['grunt-jscs'];
		}

		if (this.taskRunner.indexOf('gulp') !== -1) {
			this.fs.copyTpl(
				this.templatePath(this.generatorGulpPath + '_testing.js.ejs'),
				this.gulpPath + 'testing.js',
				this
			);
		}
	} else {
		delete this.pkgFile['devDependencies']['grunt-jscs'];
		delete this.pkgFile['devDependencies']['gulp-jscs'];
	}

	/**
	 * HTML Hint
	 */
	if (this.testAndQALibs.indexOf(htmlHintId) !== -1) {
		this.fs.copy(
			this.templatePath(this.generatorHelperPath + 'task-configs/.htmlhintrc'),
			this.helperPath + 'task-configs/.htmlhintrc'
		);

		if (this.taskRunner.indexOf('grunt') !== -1 && this.taskRunner.indexOf('gulp') === -1) {
			this.fs.copy(
				this.templatePath(this.generatorGruntPath + 'htmlhint.js'),
				this.gruntPath + 'htmlhint.js'
			);
			delete this.pkgFile['devDependencies']['gulp-htmlhint'];
		} else {
			delete this.pkgFile['devDependencies']['grunt-htmlhint'];

			this.fs.copyTpl(
				this.templatePath(this.generatorGulpPath + '_hinting.js.ejs'),
				this.gulpPath + 'hinting.js',
				this
			);
		}
	} else {
		delete this.pkgFile['devDependencies']['gulp-htmlhint'];
		delete this.pkgFile['devDependencies']['grunt-htmlhint'];
	}

	/**
	 * JS Hint
	 */
	if (this.testAndQALibs.indexOf(jsHintId) != -1) {
		this.fs.copy(
			this.templatePath(this.generatorHelperPath + 'task-configs/.jshintrc'),
			this.helperPath + 'task-configs/.jshintrc'
		);

		if (this.taskRunner.indexOf('grunt') !== -1 && this.taskRunner.indexOf('gulp') === -1) {
			this.fs.copy(
				this.templatePath(this.generatorGruntPath + 'jshint.js'),
				this.gruntPath + 'jshint.js'
			);
			delete this.pkgFile['devDependencies']['gulp-jshint'];
		} else {
			delete this.pkgFile['devDependencies']['grunt-contrib-jshint'];
		}
	} else {
		delete this.pkgFile['devDependencies']['gulp-jshint'];
		delete this.pkgFile['devDependencies']['grunt-contrib-jshint'];
	}

	/**
	 * JS Hint and HMTL Hint
	 */
	if (this.testAndQALibs.indexOf(htmlHintId) !== -1 || this.testAndQALibs.indexOf(jsHintId) !== -1) {
		if (this.taskRunner.indexOf('gulp') !== -1) {
			this.fs.copy(
				this.templatePath(this.generatorGulpPath + '_hinting.js.ejs'),
				this.gulpPath + 'hinting.js'
			);
		}
	}

	/**
	 * Stylelint
	 */
	if (this.testAndQALibs.indexOf(sasslintId) !== -1) {
		this.fs.copy(
			this.templatePath(this.generatorHelperPath + 'task-configs/stylelint.config.js'),
			this.helperPath + 'task-configs/stylelint.config.js'
		);

		if (this.taskRunner.indexOf('gulp') !== -1) {
			this.fs.copyTpl(
				this.templatePath(this.generatorGulpPath + '_hinting.js.ejs'),
				this.gulpPath + 'hinting.js',
				this
			);
		} else {
			delete this.pkgFile['devDependencies']['gulp-stylelint'];
		}

		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.fs.copy(
				this.templatePath(this.generatorGruntPath + 'stylelint.js'),
				this.gruntPath + 'stylelint.js'
			);
		} else {
			delete this.pkgFile['devDependencies']['grunt-stylelint'];
		}

	} else {
		delete this.pkgFile['devDependencies']['gulp-stylelint'];
		delete this.pkgFile['devDependencies']['grunt-stylelint'];
	}

	/**
	 * Webdriver
	 */
	if (this.testAndQALibs.indexOf(webdriverId) !== -1) {
		if (this.taskRunner.indexOf('grunt') !== -1) {

			this.fs.copy(
				this.templatePath(this.generatorHelperPath + '_grunt/webdriver.js'),
				this.helperPath + '_grunt/webdriver.js'
			);
			// create demo document
			this.fs.copyTpl(
				this.templatePath('test/webdriver.html.ejs'),
				'test/helpers/html/test.html',
				this
			);
			// create demo document
			this.fs.copy(
				this.templatePath('test/demo.test.js'),
				'test/helpers/html/demo.test.js'
			);
			// create demo spec
			this.fs.copy(
				this.templatePath('test/demo.spec.js'),
				'test/spec/e2e/demo.spec.js'
			);
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