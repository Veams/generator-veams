/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');
const answers = require('../test_helpers/prompt-answer-factory')({
	"gruntModules":[
		"grunt-contrib-handlebars"
	]
});

describe('grunt-contrib-handlebars', function () {
	const helperPath = 'configs/';

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
		assert.fileContent('package.json', /grunt-contrib-handlebars/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/handlebars.js");
	});

	it('adds handlebars task to Gruntfile.js', function () {
		assert.fileContent('Gruntfile.js', /handlebars/);
	});

	it('adds replace task to Gruntfile.js', function () {
		assert.fileContent('Gruntfile.js', /grunt-text-replace/);
	});
});