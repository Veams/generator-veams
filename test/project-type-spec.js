/*global describe, beforeEach, it*/
'use strict';

const helpers = require('yeoman-test');
const path = require('path');
const assert = require('yeoman-assert');
const defaultPrompts = require('../test_helpers/prompt-answer-factory')();

describe('Project Type', function () {
	const helperPath = "configs/tasks/";

	describe('when static page app is chosen', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			projectType: 'static-page-app'
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

		it('adds handlebars to package.json', function () {
			assert.fileContent('package.json', /handlebars/);
		});

	});

	describe('when single page app is chosen with Grunt', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			projectType: 'single-page-app'
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

		it('adds react to package.json', function () {
			assert.fileContent('package.json', /react/);
		});

		it('adds static copy task', function () {
			assert.fileContent(helperPath + "_grunt/sync.js", /static/);
		});

	});
});
