/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var answers = require('../test_helpers/prompt-answer-factory')({
	'gruntModules': [
		'grunt-webfont'
	]
});

describe('grunt-webfont', function () {
	var helperPath = 'helpers/';

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
		assert.fileContent('package.json', /grunt-webfont/);
		assert.fileContent('package.json', /fs-extra/);
	});

	it('creates helper files', function () {
		helpers.assertFile(helperPath + '_grunt/webfont.js');
		helpers.assertFile(helperPath + '_grunt/custom/iconbuilder.js');
	});

	it('adds tasks to Gruntfile.js file', function () {
		assert.fileContent('Gruntfile.js', /\'webfont-icons\'/);
		assert.fileContent('Gruntfile.js', /\'iconbuilder\'/);
	});
});