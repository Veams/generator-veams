/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"features": [
		"installDocs"
	]
});

describe('grunt-styleguide', function () {
	var helperPath = "helpers/";
	var srcPath = "resources/";

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
		assert.fileContent('package.json', /grunt-styleguide/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/styleguide.js");
	});

	it('adds styleguide template', function () {
		assert.file(helperPath + "templates/styleguide-template/index.html");
	});

	it('adds task to concurrent.js file', function () {
		assert.fileContent(helperPath + "_grunt/concurrent.js", /styleguide/);
	});

	it('adds styleguide.md to sass folder', function () {
		assert.file(srcPath + "scss/styleguide.md");
	});

});