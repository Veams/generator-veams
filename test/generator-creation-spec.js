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
			'.babelrc',
			'.editorconfig',
			'environments/environment.local.js',
			'environments/environment.dev.js',
			'environments/environment.production.js',
			'environments/environment.qa.js',
			'README.md',
			'veams-cli.json'
		];
		assert.file(expected);
	});
});