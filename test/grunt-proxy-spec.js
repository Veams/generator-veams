/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"modules": [
		"grunt-connect-proxy"
	],
	"installProxy": true,
	"proxyHost": "0.0.0.0",
	"proxyPort": 80
});


describe('grunt-connect-proxy', function () {
	var helperPath = "helpers/";

	beforeEach(function (done) {
		helpers.testDirectory(path.join(__dirname, 'tmp'), function (err) {
			if (err) {
				return done(err);
			}
			this.app = helpers.createGenerator('prototype:app', [
				'../../generators/app'
			]);

			helpers.mockPrompt(this.app,
				answers
			);
			this.app.options['skip-install'] = true;
			this.app.options['skip-welcome-message'] = true;

			done();
		}.bind(this));
	});

	it('adds references to package.json, connect.js and watch.js', function (done) {
		this.app.run({}, function () {
			helpers.assertFile('package.json', /grunt-connect-proxy/);
			done();
		});
	});

	it('creates the helpers/_grunt/connect.js with the specified host and port', function (done) {
		this.app.run({}, function () {
			helpers.assertFile(helperPath + '_grunt/connect.js', /proxy/mg);
			done();
		});
	});
	it('creates the helpers/_grunt/watch.js with a new task', function (done) {
		this.app.run({}, function () {
			helpers.assertFile(helperPath + '_grunt/watch.js', /proxies/);
			done();
		});
	});
	it('adds task to Gruntfile.js', function (done) {
		this.app.run({}, function () {
			helpers.assertFile('Gruntfile.js', /\'devProxy\'/);
			done();
		});
	});
});