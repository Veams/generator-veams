/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"gruntModules": [
		"grunt-csscomb"
	]
});


describe('grunt-csscomb', function () {
	var srcPath = "resources/";
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
		helpers.assertFile('package.json', /grunt-csscomb/);
	});

	it('creates helper files', function () {
		helpers.assertFile(helperPath + "_grunt/csscomb.js");
		helpers.assertFile(helperPath + "task-configs/csscomb.json");
	});

	it('adds task to Gruntfile.js file', function () {
		helpers.assertFile("Gruntfile.js", /\'beauty-scss\'/);
	});
});