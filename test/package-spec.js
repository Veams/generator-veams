/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');

describe('Package.json', function () {
	const srcPath = 'src/';

	describe('when Grunt is selected and no plugins are used', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			taskRunner: ['grunt'],
			gruntModules: [],
			templateEngine: false
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

	});

	describe('when Gulp is selected and no plugins are used', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			taskRunner: ['gulp'],
			gruntModules: [],
			gulpModules: [],
			templateEngine: false
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

		it('delete all packages dependencies for grunt', function () {
			assert.noFileContent('package.json', /grunt|assemble|mangony/);
		});

	});

	describe('when Gulp and Grunt are selected and no plugins are used', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			taskRunner: ['gulp', 'grunt'],
			gruntModules: [],
			gulpModules: [],
			templateEngine: false
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

		it('delete most packages dependencies for grunt', function () {
			assert.noFileContent('package.json', /grunt-chokidar/);
		});

	});

});