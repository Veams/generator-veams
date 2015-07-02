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
	'gulpModules': [
		'gulp-htmlhint'
	]
});

describe('gulp-htmlhint', function () {
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
		assert.fileContent('package.json', /gulp-htmlhint/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + '_gulp/hinting.js');
	});

	it('adds task to helper file', function () {
		assert.fileContent(helperPath + '_gulp/hinting.js', /gulp-htmlhint/);
	});
});