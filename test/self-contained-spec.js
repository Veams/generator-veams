/*global describe, beforeEach, it*/
'use strict';

const fs = require('fs');
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const srcPath = 'resources/';
const helperPath = 'helpers/';

describe('Self contained project structure with Grunt', function () {
	const answers = require('../test_helpers/prompt-answer-factory')({
		'selfContained': true,
		'taskRunner': [
			'grunt'
		]
	});

	beforeEach(function (done) {
		helpers.run(path.join(__dirname, '../generators/app'))
			.inDir(path.join(__dirname, 'tmp'))
			.withOptions({
				'skip-install': true,
				'skip-welcome-message': true
			})
			.withPrompts(answers)
			.on('end', done);
	});

	it('adds setting in config.js', function () {
		assert.fileContent('helpers/config.js', /self-contained/);
	});

	it('adds further paths to watch.js file', function () {
		assert.fileContent(helperPath + '_grunt/chokidar.js', /templating\/partials\/\*\*\/scss\/\*\*\/\*\.scss/);
	});
});

describe('Self contained project structure with Gulp', function () {
	const answers = require('../test_helpers/prompt-answer-factory')({
		'selfContained': true,
		'taskRunner': [
			'gulp'
		]
	});

	beforeEach(function (done) {
		helpers.run(path.join(__dirname, '../generators/app'))
			.inDir(path.join(__dirname, 'tmp'))
			.withOptions({
				'skip-install': true,
				'skip-welcome-message': true
			})
			.withPrompts(answers)
			.on('end', done);
	});

	it('adds setting in config.js', function () {
		assert.fileContent('helpers/config.js', /self-contained/);
	});

	it('adds further paths to watch task in Gulpfile.js file', function () {
		assert.fileContent('Gulpfile.js', /templating\/partials\/\*\*\/scss\/\*\*\/\*\.scss/);
	});
});