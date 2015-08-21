var pg = require('./../lib/pg-helpers.js');

var jscsId = 'jscs';
var htmlHintId = 'hintingHTML';
var jsHintId = 'hintingJS';

exports.questions = function () {
	return [
		{
			name: 'testAndQA',
			type: 'confirm',
			message: 'Would you like to add testing and qa?',
			default: this.config.get('testAndQA')
		},
		{
			when: function (answers) {
				return answers.testAndQA;
			},
			name: 'testAndQALibs',
			type: 'checkbox',
			message: 'What would you like to test?',
			choices: [
				{
					name: 'JavaScript Code Style',
					value: jscsId,
					checked: true
				},
				{
					name: 'HTML Hinting',
					value: htmlHintId,
					checked: true
				},
				{
					name: 'JS Hinting',
					value: jsHintId,
					checked: true
				}
			],
			default: this.config.get('testAndQALibs')
		}
	];
};

exports.setup = function () {
	this.testAndQALibs = this.config.get('testAndQALibs') || [];

	pg.definePaths.call(this);
};

exports.scaffold = function () {
	if (!this.testAndQALibs && !this.testAndQALibs.length) return;


	if (this.testAndQALibs.indexOf(jscsId) != -1) {
		this.copy(
			this.generatorHelperPath + 'task-configs/jscs.airbnb.json',
			this.helperPath + 'task-configs/jscs.airbnb.json'
		);

		if (this.taskRunner.indexOf('grunt') !== -1 && this.taskRunner.indexOf('gulp') === -1) {
			this.copy(
				this.generatorHelperPath + '_grunt/jscs.js',
				this.helperPath + '_grunt/jscs.js'
			);
		}

		if (this.taskRunner.indexOf('gulp') !== -1) {
			this.copy(
				this.generatorGulpPath + '_testing.js.ejs',
				this.gulpPath + 'testing.js'
			);
		}
	}

	if (this.testAndQALibs.indexOf(htmlHintId) != -1) {
		this.copy(
			this.generatorHelperPath + 'task-configs/.htmlhintrc',
			this.helperPath + 'task-configs/.htmlhintrc'
		);

		if (this.taskRunner.indexOf('grunt') !== -1 && this.taskRunner.indexOf('gulp') === -1) {
			this.copy(
				this.generatorGruntPath + 'htmlhint.js',
				this.gruntPath + 'htmlhint.js'
			);
		}
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
		}
	}

	if (this.testAndQALibs.indexOf(htmlHintId) !== -1 || this.testAndQALibs.indexOf(jsHintId) !== -1) {
		if (this.taskRunner.indexOf('gulp') !== -1) {
			this.copy(
				this.generatorGulpPath + '_hinting.js.ejs',
				this.gulpPath + 'hinting.js'
			);
		}
	}
};