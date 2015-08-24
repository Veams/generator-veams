/*global describe, beforeEach, it*/
'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var answers = require('../test_helpers/prompt-answer-factory')({});

describe('grunt-sass-globber', function () {
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
		assert.fileContent('package.json', /grunt-sass-globber/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/sassGlobber.js");
	});

	it('adds task to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /\'sassGlobber:dev\'/);
	});

	it('refers to styles.scss in task file', function () {
		assert.fileContent(helperPath + "_grunt/sassGlobber.js", /source: \'styles\.scss\'/);
	});
});