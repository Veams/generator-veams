/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');
const answers = require('../test_helpers/prompt-answer-factory')({
	"gruntModules":[
		"grunt-version"
	],
	"features": [
		"createDevFolder"
	]
});

describe('grunt-version', function () {
	const helperPath = "helpers/";
	const srcPath = "resources/";

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
		assert.fileContent('package.json', /grunt-version/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/version.js");
	});

	it('creates partial file', function () {
		assert.file(srcPath + "templating/partials/blocks/b-version.hbs");
	});

	it('adds task to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /version/);
	});

});