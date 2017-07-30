/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');
const answers = require('../test_helpers/prompt-answer-factory')({
	"gruntModules": [
		"grunt-csscomb"
	]
});


describe('grunt-csscomb', function () {
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
		assert.fileContent('package.json', /grunt-csscomb/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/csscomb.js");
		assert.file(helperPath + "task-configs/csscomb.json");
	});

	it('adds task to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /\'beauty-scss\'/);
	});
});