/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	'gruntModules': [
		'grunt-browserify'
	]
});

describe('grunt-browserify', function () {
	var helperPath = 'configs/';
	var srcPath = 'src/';

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
		assert.fileContent('package.json', /grunt-browserify/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + '_grunt/browserify.js');
	});

	it('adds task to Gruntfile.js file', function () {
		assert.fileContent('Gruntfile.js', /'browserify\:dev'/);
		assert.fileContent('Gruntfile.js', /'browserify\:vendor'/);
		assert.fileContent('Gruntfile.js', /'browserify\:dist'/);
	});

	it('adds app.js, main.js to js folder', function () {
		assert.file([
			srcPath + 'shared/scripts/app.js',
			srcPath + 'shared/scripts/main.js'
		]);
	});
});