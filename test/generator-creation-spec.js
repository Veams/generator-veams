/*global describe, beforeEach, it*/
'use strict';

const helpers = require('yeoman-test');
const path = require('path');
const assert = require('yeoman-assert');
const defaultPrompts = require('../test_helpers/prompt-answer-factory')();

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
		const expected = [
			// add files you expect to exist here.
			'Gruntfile.js',
			'package.json',
			'.gitignore',
			'helpers/config.js',
			'.bowerrc',
			'bower.json',
			'README.md'
		];
		assert.file(expected);
	});

	it('adds folderStructure property to config.js', function () {
		assert.fileContent('helpers/config.js', /folderStructure/);
	});
});