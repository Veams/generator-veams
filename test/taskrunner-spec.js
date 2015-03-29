/*global describe, beforeEach, it*/
'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('task runner is Grunt', function () {
	var srcPath = "resources/";
	var helperPath = "helpers/";
	var answers = require('../test_helpers/prompt-answer-factory')({
		"taskRunner": [
			"grunt"
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

	it('adds references to package.json', function () {
		assert.fileContent('package.json', /grunt/);
	});

	it('creates Gruntfile.js', function () {
		assert.file('Gruntfile.js');
	});
});

describe('task runner is Gulp', function () {
	var srcPath = "resources/";
	var helperPath = "helpers/";
	var answers = require('../test_helpers/prompt-answer-factory')({
		"taskRunner": [
			"gulp"
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

	it('adds references to package.json', function () {
		assert.fileContent('package.json', /gulp/);
	});

	it('creates Gruntfile.js', function () {
		assert.file('Gulpfile.js');
	});
});