/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	'taskRunner': [
		'gulp'
	],
	'testAndQA': true,
	'testAndQALibs': [
		'stylelint'
	]
});

describe('gulp-stylelint', function () {
	var helperPath = 'helpers/';
	var srcPath = 'resources/';

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
		assert.fileContent('package.json', /gulp-stylelint/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + '_gulp/hinting.js');
		assert.file(helperPath + 'task-configs/stylelint.config.js');
	});

	it('adds task to helper file', function () {
		assert.fileContent(helperPath + '_gulp/hinting.js', /gulp-stylelint/);
		assert.fileContent(helperPath + '_gulp/hinting.js', /stylelint/);
	});

	it('adds task to Gulpfile', function () {
		assert.fileContent('Gulpfile.js', /stylelint/);
	});
});