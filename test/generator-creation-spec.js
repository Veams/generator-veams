/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var defaultPrompts = require('../test_helpers/prompt-answer-factory')();

describe('prototype-generator', function () {
	beforeEach(function (done) {
		helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
			if (err) {
				return done(err);
			}

			this.app = helpers.createGenerator('prototype:app', [
				'../../generators/app'
			]);
			done();
		}.bind(this));
	});

	it('creates expected files', function (done) {
		var expected = [
			// add files you expect to exist here.
			'Gruntfile.js',
			'package.json',
			'.gitignore',
			'.bowerrc',
			'bower.json',
			'README.md'
		];

		helpers.mockPrompt(this.app, defaultPrompts);

		this.app.options['skip-install'] = true;
		this.app.options['skip-welcome-message'] = true;
		this.app.run({}, function () {
			helpers.assertFiles(expected);
			done();
		});
	});
});