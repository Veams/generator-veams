/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"installAssemble": true,
	"modules": [
		"grunt-comment-toggler"
	]
});

describe('grunt-comment-toggler', function () {
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
			helpers.assertFile('package.json', /grunt-comment-toggler/);
		});
		done();
	});

	it('creates helper files', function (done) {
		this.app.run({}, function () {
			helpers.assertFile(helperPath + "_grunt/toggleComments.js");
			done();
		});
	});

	it('adds task to Gruntfile.js file', function (done) {
		this.app.run({}, function () {
			helpers.assertFile("Gruntfile.js", /\'toggleComments\'/);
			helpers.assertFile("Gruntfile.js", /toggleComments: \'grunt-comment-toggler\'/);
			done();
		});
	});
});