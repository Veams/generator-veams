/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');
var defaultPrompts = require('../test_helpers/prompt-answer-factory')();

describe('generator-veams', function () {
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
			'helpers/config.js',
			'.bowerrc',
			'bower.json',
			'README.md'
		];
		helpers.assertFiles(expected);
	});

	it('adds folderStructure property to config.js', function () {
		assert.fileContent('helpers/config.js', /folderStructure/);
	});
});