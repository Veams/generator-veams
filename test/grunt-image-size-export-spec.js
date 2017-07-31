/*global describe, beforeEach, it*/
'use strict';

const fs = require('fs');
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const answers = require('../test_helpers/prompt-answer-factory')({
	"gruntModules": [
		"grunt-image-size-export"
	]
});

describe('grunt-image-size-export', function () {
	const srcPath = 'src/';
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
		assert.fileContent('package.json', /grunt-image-size-export/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/imageSizeExport.js");
	});

	it('adds task to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /\'imageSizeExport\'/);
	});
});