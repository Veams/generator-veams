/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');

describe('JavaScript Frameworks', function () {
	const srcPath = 'src/app';
	const helperPath = 'configs/tasks/_grunt/';

	describe('when Veams-Query is selected', function () {
		let answers = require('../test_helpers/prompt-answer-factory')({
			'gruntModules': [
				'grunt-browserify'
			],
			'jsLibs': [
				'veams-query'
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

		it('adds the package to package.json', function () {
			assert.fileContent('package.json', /veams-query/);
		});

		it('adds import state to app.veams.js', function () {
			assert.fileContent(srcPath + 'app.veams.js', /veams-query/);
		});

		it('adds references in browserify task', function () {
			assert.fileContent(helperPath + 'browserify.js', /veams-query/);
		});
	});

	describe('when jQuery is selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'gruntModules': [
				'grunt-browserify'
			],
			'jsLibs': [
				'jquery'
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

		it('adds the package to package.json', function () {
			assert.fileContent('package.json', /jquery/);
		});

		it('adds import state to app.veams.js', function () {
			assert.fileContent(srcPath + 'app.veams.js', /jquery/);
		});
	});
});