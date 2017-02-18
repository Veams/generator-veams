/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');
const answers = require('../test_helpers/prompt-answer-factory')({
	'taskRunner': [
		'gulp'
	],
	'testAndQA': true,
	'testAndQALibs': [
		'hintingJS'
	]
});

describe('gulp-jshint', function () {
	const helperPath = 'helpers/';
	const srcPath = 'resources/';

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
		assert.fileContent('package.json', /gulp-jshint/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + '_gulp/hinting.js');
	});

	it('adds task to helper file', function () {
		assert.fileContent(helperPath + '_gulp/hinting.js', /hint:js/);
	});
});