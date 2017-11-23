/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');


describe('css-post-processors', function () {
	const helperPath = 'configs/tasks/';

	describe('when "Autoprefixer (PostCSS)" was chosen', function () {

		const answers = require('../test_helpers/prompt-answer-factory')({
			cssPostProcessors: [
				'autoprefixer'
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
			assert.fileContent('package.json', /grunt-postcss/);
			assert.fileContent('package.json', /autoprefixer/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + "_grunt/postcss.js");
		});

		it('adds task to postcss.js file', function () {
			assert.fileContent(helperPath + "_grunt/postcss.js", /\'autoprefixer\'/);
		});

		it('adds task to Gruntfile.js file', function () {
			assert.fileContent("Gruntfile.js", /\'postcss:dist\'/);
		});
	});

	describe('when "CSS Separator (PostCSS)" was chosen', function () {
		const helperPath = 'configs/tasks/';

		const answers = require('../test_helpers/prompt-answer-factory')({
			cssPostProcessors: [
				'postCssSeparator'
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
			assert.fileContent('package.json', /grunt-postcss-separator/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + "_grunt/postcssSeparator.js");
		});

		it('adds task to Gruntfile.js file', function () {
			assert.fileContent("Gruntfile.js", /\'postcssSeparator\'/);
		});
	});

	describe('when "Coding style formatter (CSScomb)" was chosen', function () {
		const helperPath = 'configs/tasks/';

		const answers = require('../test_helpers/prompt-answer-factory')({
			cssPostProcessors: [
				'cssComb'
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
			assert.fileContent('package.json', /grunt-csscomb/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + "_grunt/csscomb.js");
			assert.file(helperPath + "tasks/csscomb.config.json");
		});

		it('adds task to Gruntfile.js file', function () {
			assert.fileContent("Gruntfile.js", /\'beauty-scss\'/);
		});
	});
});