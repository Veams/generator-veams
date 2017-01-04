/*global describe, beforeEach, it*/
'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var srcPath = 'resources/';
var helperPath = 'helpers/';

describe('Self contained project structure with Grunt', function () {
	var answers = require('../test_helpers/prompt-answer-factory')({
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
		assert.fileContent(helperPath + '_grunt/chokidar.js', /templating\/partials\/scss\/\*\*\/\*\.scss/);
	});
});

describe('Self contained project structure with Gulp', function () {
	var answers = require('../test_helpers/prompt-answer-factory')({
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
		assert.fileContent('Gulpfile.js', /templating\/partials\/scss\/\*\*\/\*\.scss/);
	});
});