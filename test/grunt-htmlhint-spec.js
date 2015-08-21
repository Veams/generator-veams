/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	'testAndQA': true,
	'testAndQALibs': [
		'hintingHTML'
	]
});

describe('grunt-htmlhint', function () {
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
		assert.fileContent('package.json', /grunt-htmlhint/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/htmlhint.js");
	});

	it('adds task to concurrent.js file', function () {
		assert.fileContent(helperPath + "_grunt/concurrent.js", /\'htmlhint\'/);
	});
});