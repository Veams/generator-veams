/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"gruntModules":[
		"grunt-version"
	],
	"features": [
		"createDevFolder"
	]
});

describe('grunt-version', function () {
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
		assert.fileContent('package.json', /grunt-version/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/version.js");
	});

	it('creates partial file', function () {
		assert.file(srcPath + "templating/partials/blocks/b-version.hbs");
	});

	it('adds task to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /version/);
	});

});