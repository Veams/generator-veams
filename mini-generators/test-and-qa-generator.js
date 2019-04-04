'use strict';

const helpers = require('./../lib/helpers.js');
const jscsId = 'jscs';
const htmlHintId = 'hintingHTML';
const jsHintId = 'hintingJS';
const sasslintId = 'stylelint';
const esLintId = 'eslint';
const huskyId = 'husky';
const karmaId = 'karma';

exports.questions = function () {
	const qaLibsId = 'testAndQALibs';
	const qaLibsQuestion = 'Which Testing and QA Tools do you want add?';
	const choices = [
		{
			name: 'Add Git hooks with Husky',
			value: huskyId,
			checked: true
		},
		{
			name: 'Lint your Sass (Stylelint)',
			value: sasslintId,
			checked: true
		},
		{
			name: 'Lint your JS (ESLint, Prettier)',
			value: esLintId,
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
				return answers.testAndQA;
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
				this.destinationPath(this.gruntPath + 'htmlhint.js')
			);
		} else {
			delete this.pkgFile[ 'devDependencies' ][ 'grunt-htmlhint' ];
		}
	} else {
		delete this.pkgFile[ 'devDependencies' ][ 'grunt-htmlhint' ];
	}

	/**
	 * Stylelint
	 */
	if (this.testAndQALibs.indexOf(sasslintId) !== -1) {
		this.fs.copy(
			this.templatePath(this.generatorHelperPath + 'tasks/linting/stylelint.config.js'),
			this.destinationPath(this.helperPath + 'tasks/linting/stylelint.config.js')
		);

		this.pkgFile[ 'scripts' ][ 'lint:styles' ] = 'stylelint src/app/**/*.scss --config configs/tasks/linting/stylelint.config.js';

	} else {
		delete this.pkgFile[ 'devDependencies' ][ 'stylelint' ];
	}

	/**
	 * ESLint
	 */
	if (this.testAndQALibs.indexOf(esLintId) !== -1) {
		this.fs.copy(
			this.templatePath(this.generatorHelperPath + 'tasks/linting/eslint.config.js'),
			this.destinationPath(this.helperPath + 'tasks/linting/eslint.config.js')
		);

		this.pkgFile[ 'scripts' ][ 'lint:scripts' ] = 'eslint \"src/**/*.js\" --config configs/tasks/linting/eslint.config.js';

	} else {
		delete this.pkgFile[ 'devDependencies' ][ 'babel-eslint' ];
		delete this.pkgFile[ 'devDependencies' ][ 'eslint' ];
		delete this.pkgFile[ 'devDependencies' ][ 'eslint-config-prettier' ];
		delete this.pkgFile[ 'devDependencies' ][ 'eslint-plugin-prettier' ];
		delete this.pkgFile[ 'devDependencies' ][ 'prettier' ];
	}

	/**
	 * Huksy
	 */
	if (this.testAndQALibs.indexOf(huskyId) !== -1) {
		let command = '';

		if (this.testAndQALibs.indexOf(sasslintId) !== -1) {
			command += 'npm run lint:styles -- --fix && npm run lint:styles';
		}

		if (this.testAndQALibs.indexOf(esLintId) !== -1) {
			if (command.length > 0) {
				command += ' && '
			}

			command += 'npm run lint:scripts -- --fix && npm run lint:scripts';
		}
		this.pkgFile[ 'husky' ][ 'hooks' ][ 'pre-commit' ] = command;


	} else {
		delete this.pkgFile[ 'devDependencies' ][ 'husky' ];
		delete this.pkgFile[ 'husky' ];
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
