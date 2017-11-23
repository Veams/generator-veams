/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');

describe('grunt-stylelint', function () {
	const helperPath = 'configs/tasks/';

	describe('when disabled', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'taskRunner': 'grunt',
			'testAndQA': true,
			'testAndQALibs': [
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

		it('deletes references in package.json', function () {
			assert.noFileContent('package.json', /grunt-stylelint/);
		});
	});

	describe('when selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'taskRunner': 'grunt',
			'testAndQA': true,
			'testAndQALibs': [
				'stylelint'
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
			assert.fileContent('package.json', /grunt-stylelint/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + '_grunt/stylelint.js');
			assert.file(helperPath + 'stylelint.config.js');
		});

		it('adds task to watch file', function () {
			assert.fileContent(helperPath + '_grunt/chokidar.js', /stylelint:scss/);
		});

		it('adds task to Gruntfile', function () {
			assert.fileContent('Gruntfile.js', /stylelint:scss/);
		});
	});
});