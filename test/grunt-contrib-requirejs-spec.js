/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"gruntModules": [
		"grunt-contrib-requirejs"
	]
});

describe('grunt-contrib-requirejs', function () {
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
		assert.fileContent('package.json', /grunt-contrib-requirejs/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/requirejs.js");
	});

	it('adds task to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /\'requirejs\:dev\'/);
	});

	it('adds app.js, main.js and config.js to js folder', function () {
		assert.file([
			srcPath + 'js/app.js',
			srcPath + 'js/main.js'
		]);
	});

	it('adds task to watch file', function () {
		assert.fileContent(helperPath + "_grunt/watch.js", /requirejs\:dev/);
	});
});