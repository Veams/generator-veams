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
	'gulpModules': [
		'browserify'
	]
});

describe('Browserify in Gulp', function () {
	const helperPath = 'configs/';

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
		assert.fileContent('package.json', /browserify/);
		assert.fileContent('package.json', /watchify/);
		assert.fileContent('package.json', /vinyl-source-stream/);
		assert.fileContent('package.json', /vinyl-buffer/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + '_gulp/scripts.js');
	});

	it('adds task to helper file', function () {
		assert.fileContent(helperPath + '_gulp/scripts.js', /browserify/);
		assert.fileContent(helperPath + '_gulp/scripts.js', /watchify/);
	});
});