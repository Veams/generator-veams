/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"modules": [
		"grunt-grunticon"
	]
});


describe('grunt-grunticon', function () {
	var srcPath = "resources/";
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
			helpers.assertFile('package.json', /grunt-grunticon/);
			helpers.assertFile('package.json', /grunt-text-replace/);
			done();
		});
	});

	it('creates helper files', function (done) {
		this.app.run({}, function () {
			helpers.assertFile(helperPath + "_grunt/grunticon.js");
			helpers.assertFile(helperPath + "_grunt/replace.js");
			done();
		});
	});

	it('adds tasks to Gruntfile.js file', function (done) {
		this.app.run({}, function () {
			helpers.assertFile("Gruntfile.js", /\'icons\'/);
			helpers.assertFile("Gruntfile.js", /\'grunticon\'/);
			helpers.assertFile("Gruntfile.js", /\'replace\'/);
			done();
		});
	});
});