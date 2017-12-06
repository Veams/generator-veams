'use strict';

const helpers = require('./../lib/helpers.js');
const jscsId = 'jscs';
const htmlHintId = 'hintingHTML';
const jsHintId = 'hintingJS';
const sasslintId = 'stylelint';
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
			checked: false
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
				return answers.testAndQA && answers.taskRunner === 'grunt';
			},
			name: qaLibsId,
			type: 'checkbox',
			message: qaLibsQuestion,
			choices: choices,
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
			this.templatePath(this.generatorHelperPath + 'tasks/linting/jscs.config.json'),
			this.helperPath + 'tasks/linting/jscs.config.json'
		);

		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.fs.copy(
				this.templatePath(this.generatorGruntPath + 'jscs.js'),
				this.gruntPath + 'jscs.js'
			);
		}
	} else {
		delete this.pkgFile['devDependencies']['grunt-jscs'];
	}

	/**
	 * HTML Hint
	 */
	if (this.testAndQALibs.indexOf(htmlHintId) !== -1) {
		this.fs.copy(
			this.templatePath(this.generatorHelperPath + 'tasks/linting/.htmlhintrc'),
			this.helperPath + 'tasks/linting/.htmlhintrc'
		);

		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.fs.copy(
				this.templatePath(this.generatorGruntPath + 'htmlhint.js'),
				this.gruntPath + 'htmlhint.js'
			);
		}
	} else {
		delete this.pkgFile['devDependencies']['grunt-htmlhint'];
	}

	/**
	 * JS Hint
	 */
	if (this.testAndQALibs.indexOf(jsHintId) != -1) {
		this.fs.copy(
			this.templatePath(this.generatorHelperPath + 'tasks/linting/.jshintrc'),
			this.helperPath + 'tasks/linting/.jshintrc'
		);

		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.fs.copy(
				this.templatePath(this.generatorGruntPath + 'jshint.js'),
				this.gruntPath + 'jshint.js'
			);
		}
	} else {
		delete this.pkgFile['devDependencies']['grunt-contrib-jshint'];
	}

	/**
	 * Stylelint
	 */
	if (this.testAndQALibs.indexOf(sasslintId) !== -1) {
		this.fs.copy(
			this.templatePath(this.generatorHelperPath + 'tasks/linting/stylelint.config.js'),
			this.helperPath + 'tasks/linting/stylelint.config.js'
		);

		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.fs.copy(
				this.templatePath(this.generatorGruntPath + 'stylelint.js'),
				this.gruntPath + 'stylelint.js'
			);
		}

	} else {
		delete this.pkgFile['devDependencies']['grunt-stylelint'];
	}

	/**
	 * Karma
	 */
	if (this.testAndQALibs.indexOf(karmaId) !== -1) {

		if (this.taskRunner.indexOf('grunt') !== -1) {
			//this.copy(this.generatorHelperPath + '_grunt/karma.js', this.helperPath + '_grunt/karma.js');
		}
	}
};