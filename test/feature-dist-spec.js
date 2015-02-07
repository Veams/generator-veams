/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"installAssemble": true,
	"features": [
		"createDevFolder"
	]
});

describe('feature dist folder', function () {
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

	it('creates copy task', function () {
		var expected = [
			helperPath + "_grunt/copy.js"
		];
		assert.file(expected);
	});

	it('adds options to Gruntfile.js', function () {
		assert.fileContent('Gruntfile.js', /dist/);
		assert.fileContent('Gruntfile.js', /grunt\.registerTask\(\'dist\'/);
	});

	it('adds copy to package.json', function () {
		assert.fileContent('package.json', /grunt-contrib-copy/);
	});
});