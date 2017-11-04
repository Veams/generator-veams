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
			this.templatePath(this.generatorHelperPath + 'tasks/jscs.config.json'),
			this.helperPath + 'tasks/jscs.config.json'
		);

		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.fs.copy(
				this.templatePath(this.generatorHelperPath + '_grunt/jscs.js'),
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
			this.templatePath(this.generatorHelperPath + 'tasks/.htmlhintrc'),
			this.helperPath + 'tasks/.htmlhintrc'
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
			this.templatePath(this.generatorHelperPath + 'tasks/.jshintrc'),
			this.helperPath + 'tasks/.jshintrc'
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
			this.templatePath(this.generatorHelperPath + 'tasks/stylelint.config.js'),
			this.helperPath + 'tasks/stylelint.config.js'
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