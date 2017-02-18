/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');
const answers = require('../test_helpers/prompt-answer-factory')({
	"gruntModules": [
		"grunt-grunticon"
	]
});

describe('grunt-grunticon', function () {
	const helperPath = "helpers/";

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
		assert.fileContent('package.json', /grunt-grunticon/);
		assert.fileContent('package.json', /grunt-text-replace/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/grunticon.js");
		assert.file(helperPath + "_grunt/replace.js");
	});

	it('adds tasks to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /\'icons\'/);
		assert.fileContent("Gruntfile.js", /\'grunticon\'/);
		assert.fileContent("Gruntfile.js", /\'replace\'/);
	});
});