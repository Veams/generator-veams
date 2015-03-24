/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"gruntModules": [
		"grunt-dr-svg-sprites"
	]
});

describe('grunt-dr-svg-sprites', function () {
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
		assert.fileContent('package.json', /grunt-dr-svg-sprites/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/dr-svg-sprites.js");
		assert.file(helperPath + "templates/svg-sprites/stylesheet.hbs");
	});

	it('adds task and fallback to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /\'icons\'/);
		assert.fileContent("Gruntfile.js", /\'dr-svg-sprites\'/);
	});

	it('adds sub-task to replace.js', function () {
		assert.fileContent(helperPath + "_grunt/replace.js", /spriteUrl/);
	});
});