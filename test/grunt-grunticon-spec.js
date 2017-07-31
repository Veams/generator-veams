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

describe('grunt-grunticon as icons task', function () {
	const helperPath = 'configs/';
	const srcPath = 'src/shared/';

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

	it('creates icons folder in styles folder', function () {
		assert.file(srcPath + "styles/icons/.gitkeep");
	});

	it('adds tasks to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /\'icons\'/);
		assert.fileContent("Gruntfile.js", /\'grunticon\'/);
		assert.fileContent("Gruntfile.js", /\'replace\'/);
	});
});