/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"modules": [
		"grunt-jsdoc"
	]
});


describe('grunt-jsdoc', function () {
	var helperPath = "helpers/";

	beforeEach(function (done) {
		helpers.testDirectory(path.join(__dirname, 'tmp'), function (err) {
			if (err) {
				return done(err);
			}

			this.app = helpers.createGenerator('prototype:app', [
				'../../generators/app'
			]);

			helpers.mockPrompt(this.app, answers);
			this.app.options['skip-install'] = true;
			this.app.options['skip-welcome-message'] = true;

			done();
		}.bind(this));
	});

	it('adds references to package.json', function (done) {
		this.app.run({}, function () {
			helpers.assertFile('package.json', /grunt-jsdoc/);
			done();
		});
	});

	it('creates helper files', function (done) {
		this.app.run({}, function () {
			helpers.assertFile(helperPath + "_grunt/jsdoc.js");
			done();
		});
	});

	it('adds task to Gruntfile.js file', function (done) {
		this.app.run({}, function () {
			helpers.assertFile("Gruntfile.js", /\'jsdoc\'/);
			done();
		});
	});

	it('adds README.md to js folder and adds jsdoc.conf.json', function (done) {
		this.app.run({}, function () {
			helpers.assertFiles(['resources/js/README.md', helperPath + 'configs/jsdoc.conf.json']);
			done();
		});
	});
});