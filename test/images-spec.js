/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');

describe('Images Processing', function () {
	const helperPath = 'configs/tasks/';

	describe('when "responsive images generation" is added', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'images': [
				'imgResponsive',
				// 'imgSizeExport'
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

		it('creates task files', function () {
			const expected = [
				helperPath + 'images/images-resizer.js',
				helperPath + 'images/presets/default-preset.js',
				helperPath + 'images/images.config.js',
			];
			assert.file(expected);
		});

		it('adds command to package.json', function () {
			assert.fileContent('package.json', /images:generate/);
		});

		it('adds description to README.md', function () {
			assert.fileContent('README.md', /Image Generation/);
		});
	});

	describe('when "image size export" is added', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'images': [
				'imgSizeExport'
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

		it('creates task files', function () {
			const expected = [
				helperPath + 'images/images-export.js',
				helperPath + 'images/images.config.js',
			];
			assert.file(expected);

		});

		it('adds command to package.json', function () {
			assert.fileContent('package.json', /images:export/);
		});

		it('adds description to README.md', function () {
			assert.fileContent('README.md', /Image Data Export/);
		});
	});
});
