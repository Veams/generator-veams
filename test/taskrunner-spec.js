/*global describe, beforeEach, it*/
'use strict';

const fs = require('fs');
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const helperPath = 'configs/tasks/';

describe('Task Runner', function () {

	describe('when Grunt is selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'taskRunner': [
				'grunt'
			]
		});

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
			assert.fileContent('package.json', /grunt/);
		});

		it('creates Gruntfile.js', function () {
			assert.file('Gruntfile.js');
		});

		it('creates default files', function () {
			const expected = [
				// add files you expect to exist here.
				helperPath + '_grunt/browserify.js',
				helperPath + '_grunt/chokidar.js',
				helperPath + '_grunt/clean.js',
				helperPath + '_grunt/concurrent.js',
				helperPath + '_grunt/cssmin.js',
				helperPath + '_grunt/sync.js',
				helperPath + '_grunt/uglify.js'
			];
			assert.file(expected);
		});

		it('adds standard tasks to watch.js file', function () {
			assert.fileContent(helperPath + '_grunt/chokidar.js', /ajax/);
			assert.fileContent(helperPath + '_grunt/chokidar.js', /assets/);
			assert.fileContent(helperPath + '_grunt/chokidar.js', /scss/);
			assert.fileContent(helperPath + '_grunt/chokidar.js', /scssDocs/);
		});

		it('adds standard tasks to sync.js file', function () {
			assert.fileContent(helperPath + '_grunt/sync.js', /assets/);
			assert.fileContent(helperPath + '_grunt/sync.js', /ajax/);
		});

	});
});