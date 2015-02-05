/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"modules":[
		"grunt-responsive-images"
	]
});

describe('grunt-responsive-images', function () {
	var helperPath = "helpers/";

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
		assert.fileContent('package.json', /grunt-responsive-images/);
		assert.fileContent('package.json', /grunt-fileindex/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/responsive_images.js");
		assert.file(helperPath + "_grunt/fileindex.js");
	});

	it('adds task to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /\'pictures\'/);
	});

	it('adds task to fileindex.js file', function () {
		assert.fileContent(helperPath + "_grunt/fileindex.js", /pictures/);
	});
});