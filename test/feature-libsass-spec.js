/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');

describe('feature libsass', function () {

	describe('when libass will be installed', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({});
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
			assert.fileContent('package.json', /grunt-sass/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + "_grunt/sass.js");
		});

		it('creates scss file', function () {
			assert.file(srcPath + "scss/styles.scss");
		});
	});

	describe('when libass will not be installed', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"features":[]
		});
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
			assert.fileContent('package.json', /grunt-bg-shell/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + "_grunt/bgShell.js");
		});

		it('creates config.rb file', function () {
			assert.file('config.rb');
		});

		it('creates scss file', function () {
			assert.file(srcPath + "scss/styles.scss");
		});
	});
});