/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');
const answers = require('../test_helpers/prompt-answer-factory')({
	"templateEngine": "assemble",
	"features": [
		"createDevFolder"
	]
});

describe('feature dist folder', function () {
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

	it('creates copy task', function () {
		const expected = [
			helperPath + "_grunt/copy.js"
		];
		assert.file(expected);
	});

	it('adds options to Gruntfile.js', function () {
		assert.fileContent('Gruntfile.js', /dist/);
		assert.fileContent('Gruntfile.js', /grunt\.registerTask\(\'dist\'/);
	});

	it('adds copy to package.json', function () {
		assert.fileContent('package.json', /grunt-contrib-copy/);
	});
});