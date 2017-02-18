/*global describe, beforeEach, it*/
'use strict';

const fs = require('fs');
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const answers = require('../test_helpers/prompt-answer-factory')({});

describe('grunt-sass-globber', function () {
	const helperPath = "helpers/";

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
		assert.fileContent('package.json', /grunt-sass-globber/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/sassGlobber.js");
	});

	it('adds task to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /\'sassGlobber:dev\'/);
	});

	it('refers to styles.scss in task file', function () {
		assert.fileContent(helperPath + "_grunt/sassGlobber.js", /source: \'styles\.scss\'/);
	});
});