/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"installAssemble": true
});


describe('assemble', function () {
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
			helpers.assertFile('package.json', /assemble/);
		});
		done();
	});

	it('creates helper files', function (done) {
		this.app.run({}, function () {
			helpers.assertFile(helperPath + "_grunt/assemble.js");
			done();
		});
	});

	it('creates resources files', function (done) {
		var expected = [
			srcPath + "data/site.json",
			srcPath + "templates/helpers/helper-factory.js",
			srcPath + "templates/helpers/helper-for.js",
			srcPath + "templates/helpers/helper-ifBlock.js",
			srcPath + "templates/helpers/helper-limit.js",
			srcPath + "templates/helpers/helper-partial.js",
			srcPath + "templates/helpers/helper-syntax.js",
			srcPath + "templates/helpers/helper-xif.js",
			srcPath + "templates/layouts/tpl-default.hbs",
			srcPath + "templates/pages/index.hbs",
			srcPath + "templates/partials/_global/_scripts.hbs",
			srcPath + "templates/partials/_global/head/_metadata.hbs",
			srcPath + "templates/partials/_global/head/_styles.hbs"
		];
		this.app.run({}, function () {
			helpers.assertFiles(expected);
			done();
		});
	});

	it('adds task to watch.js file', function (done) {
		this.app.run({}, function () {
			helpers.assertFile(helperPath + "_grunt/watch.js", /templates/);
			done();
		});
	});

	it('adds task to concurrent.js file', function (done) {
		this.app.run({}, function () {
			helpers.assertFile(helperPath + "_grunt/concurrent.js", /\'assemble\'/);
			done();
		});
	});

	it('adds task to Gruntfile.js file', function (done) {
		this.app.run({}, function () {
			helpers.assertFile("Gruntfile.js", /\'newer:assemble\'/);
			done();
		});
	});
});