/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const answers = require('../test_helpers/prompt-answer-factory')({
	'gruntModules': [
		'grunt-webfont'
	]
});

describe('grunt-webfont', function () {
	const helperPath = 'helpers/';

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
		assert.file(helperPath + '_grunt/webfont.js');
		assert.file(helperPath + '_grunt/custom/iconbuilder.js');
	});

	it('adds tasks to Gruntfile.js file', function () {
		assert.fileContent('Gruntfile.js', /\'webfont-icons\'/);
		assert.fileContent('Gruntfile.js', /\'iconbuilder\'/);
	});
});