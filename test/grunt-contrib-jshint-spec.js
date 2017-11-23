/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');
const answers = require('../test_helpers/prompt-answer-factory')({
	'testAndQA': true,
	'testAndQALibs': [
		'hintingJS'
	]
});


describe('grunt-contrib-jshint', function () {
	const helperPath = 'configs/tasks/';

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
		assert.fileContent('package.json', /grunt-contrib-jshint/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/jshint.js");
	});

	it('adds task to concurrent file', function () {
		assert.fileContent(helperPath + "_grunt/concurrent.js", /\'jshint\'/);
	});

	it('adds task to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /hintAndDocs/);
	});
});