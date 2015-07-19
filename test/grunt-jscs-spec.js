/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"gruntModules": [
		"grunt-jscs"
	]
});


describe('grunt-jscs', function () {
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
		helpers.assertFile('package.json', /grunt-jscs/);
	});

	it('creates helper files', function () {
		helpers.assertFile(helperPath + "_grunt/jscs.js");
	});

	//it('adds task to concurrent.js file', function () {
	//	helpers.assertFile(helperPath + "_grunt/concurrent.js", /\'jsdoc\'/);
	//});

	//it('adds README.md to js folder and adds jsdoc.conf.json', function () {
	//	helpers.assertFiles([
	//		'resources/js/README.md',
	//		helperPath + 'task-configs/jsdoc.conf.json'
	//	]);
	//});
});