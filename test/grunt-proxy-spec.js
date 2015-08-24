/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"gruntModules": [
		"grunt-connect-proxy"
	],
	"installProxy": true,
	"proxyHost": "0.0.0.0",
	"proxyPort": 80
});


describe('grunt-connect-proxy', function () {
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


	it('adds references to package.json, connect.js and watch.js', function () {
		helpers.assertFile('package.json', /grunt-connect-proxy/);
	});

	it('creates the helpers/_grunt/connect.js with the specified host and port', function () {
		helpers.assertFile(helperPath + '_grunt/connect.js', /proxy/mg);
	});

	it('creates the helpers/_grunt/watch.js with a new task', function () {
		helpers.assertFile(helperPath + '_grunt/watch.js', /proxies/);
	});

	it('adds task to Gruntfile.js', function () {
		helpers.assertFile('Gruntfile.js', /\'devProxy\'/);
	});
});