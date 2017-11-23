/*global describe, beforeEach, it*/
'use strict';

const helpers = require('yeoman-test');
const path = require('path');
const assert = require('yeoman-assert');
const defaultPrompts = require('../test_helpers/prompt-answer-factory')();

describe('Project Type', function () {

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
});