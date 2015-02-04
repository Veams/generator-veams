/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var defaultPrompts = require('../test_helpers/prompt-answer-factory')();

describe('prototype-generator', function () {
	beforeEach(function (done) {
		helpers.run(path.join(__dirname, '../generators/app'))
			.inDir(path.join(__dirname, 'tmp'))
			.withOptions({
				'skip-install': true,
				'skip-welcome-message': true
			})
			.withPrompts(defaultPrompts)
			.on('end', done);
	});

	it('creates expected files', function () {
		var expected = [
			// add files you expect to exist here.
			'Gruntfile.js',
			'package.json',
			'.gitignore',
			'.bowerrc',
			'bower.json',
			'README.md'
		];
		helpers.assertFiles(expected);
	});
});