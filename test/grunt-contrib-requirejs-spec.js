/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');
const answers = require('../test_helpers/prompt-answer-factory')({
	"gruntModules": [
		"grunt-contrib-requirejs"
	]
});

describe('grunt-contrib-requirejs', function () {
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
		assert.fileContent('package.json', /grunt-contrib-requirejs/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/requirejs.js");
	});

	it('adds task to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /\'requirejs\:dev\'/);
	});

	it('adds app.js, main.js and config.js to js folder', function () {
		assert.file([
			srcPath + 'js/app.js',
			srcPath + 'js/main.js'
		]);
	});

	it('adds task to chokidar file', function () {
		assert.fileContent(helperPath + "_grunt/chokidar.js", /requirejs\:dev/);
	});
});