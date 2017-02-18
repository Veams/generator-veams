/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');
const answers = require('../test_helpers/prompt-answer-factory')({});
const config = require('../lib/config');

describe('grunt-sass', function () {
	const helperPath = config.paths.helperPath;

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

	it('adds references to package.json', function () {
		assert.fileContent('package.json', /grunt-sass/);
	});

	it('creates helper files: sass', function () {
		assert.file(helperPath + "_grunt/sass.js");
	});

	it('it compiles temp file', function () {
		assert.fileContent(helperPath + "_grunt/sass.js", /styles\.tmp\.scss/);
	});

	it('adds tasks to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /sass:dev/);
	});

});