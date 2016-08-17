/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
});

describe('grunt-express-server', function () {
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
		helpers.assertFile('package.json', /"express":/);
		helpers.assertFile('package.json', /"grunt-express-server":/);
	});

	it('creates server path and server file', function () {
		var expected = [
			"server/main.js"
		];

		helpers.assertFiles(expected);
	});

	it('creates helper files', function () {
		helpers.assertFile(helperPath + "_grunt/express.js");
	});

	it('adds shortcut to jit grunt', function () {
		helpers.assertFile("Gruntfile.js", /\'express\':\s+\'grunt-express-server\'/);
	});

	it('adds task to Gruntfile.js file', function () {
		helpers.assertFile("Gruntfile.js", /\'express:dev\'/);
	});
});