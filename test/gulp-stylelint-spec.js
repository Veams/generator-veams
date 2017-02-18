/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');

describe('gulp-stylelint', function () {
	const helperPath = 'helpers/';
	const srcPath = 'resources/';


	describe('when selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'taskRunner': [
				'gulp'
			],
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
			assert.fileContent('package.json', /gulp-stylelint/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + '_gulp/hinting.js');
			assert.file(helperPath + 'task-configs/stylelint.config.js');
		});

		it('adds task to helper file', function () {
			assert.fileContent(helperPath + '_gulp/hinting.js', /gulp-stylelint/);
			assert.fileContent(helperPath + '_gulp/hinting.js', /stylelint/);
		});

		it('adds task to Gulpfile', function () {
			assert.fileContent('Gulpfile.js', /stylelint/);
		});
	});

	describe('when disabled', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'taskRunner': [
				'gulp'
			],
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
			assert.noFileContent('package.json', /gulp-stylelint/);
		});
	});
});