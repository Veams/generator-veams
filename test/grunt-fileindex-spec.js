/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({});

describe('grunt-fileindex', function () {
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
		helpers.assertFile('package.json', /grunt-fileindex/);
	});

	it('creates helper files', function () {
		helpers.assertFile(helperPath + "_grunt/fileindex.js");
	});

	it('adds task to Gruntfile.js file', function () {
		helpers.assertFile("Gruntfile.js", /\'fileindex:libsassGlobbing\'/);
	});

	it('refers to styles.scss in task file', function () {
		helpers.assertFile(helperPath + "_grunt/fileindex.js", /dest: \'<%= paths\.src %>\/scss\/styles\.scss\'/);
	});
});