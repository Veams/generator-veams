/*global describe, beforeEach, it*/
'use strict';

const fs = require('fs');
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('Server Features', function () {
	const helperPath = 'configs/tasks/';

	describe('when fake data generation is selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'server': [
				'serverFakeData'
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
			assert.fileContent('package.json', /faker/);
		});

		it('creates task file in config folder', function () {
			assert.file(helperPath + 'faker/faker.js');
		});

		it('adds preset example file in task folder', function () {
			assert.file(helperPath + 'faker/presets/example.preset.js');
		});

		it('adds description to README.md', function () {
			assert.fileContent('README.md', /Fake Data Generation/);
		});
	});
});