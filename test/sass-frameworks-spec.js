/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');

describe('Sass Frameworks', function () {
	const srcPath = 'src/app/';
	const helpersPath = 'configs/tasks/';

	describe('when Bootstrap-Sass is selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'cssLibs': [
				'bootstrap-sass'
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
			assert.fileContent('package.json', /bootstrap-sass/);
		});

		it('adds import state to styles.scss', function () {
			assert.fileContent(srcPath + 'app.scss', /bootstrap/);
		});

		it('adds comment to _vars.scss', function () {
			assert.fileContent(srcPath + 'shared/styles/global/_vars.scss', /BOOTSTRAP/);
		});
	});

	describe('when Foundation is selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'cssLibs': [
				'foundation-sites'
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
			assert.fileContent('package.json', /foundation/);
		});

		it('adds import state to styles.scss', function () {
			assert.fileContent(srcPath + 'app.scss', /foundation/);
		});
	});

	describe('when Bourbon Neat is selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'cssLibs': [
				'bourbon-neat'
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
			assert.fileContent('package.json', /bourbon/);
			assert.fileContent('package.json', /bourbon-neat/);
		});

		it('adds import state to styles.scss', function () {
			assert.fileContent(srcPath + 'shared/styles/helpers/_helpers.scss', /bourbon/);
			assert.fileContent(srcPath + 'shared/styles/helpers/_helpers.scss', /neat/);
		});
	});

	describe('when Lost Grid is selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'cssLibs': [
				'lost-grid'
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
			assert.fileContent('package.json', /lost/);
		});

		it('adds the package to the task file', function () {
			assert.fileContent('package.json', /lost/);
		});

		it('adds comment to _vars.scss', function () {
			assert.fileContent(srcPath + 'shared/styles/global/_vars.scss', /LOST/);
		});
	});

	describe('when Lost Grid and Grunt is selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'cssLibs': [
				'lost-grid'
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
			assert.fileContent('package.json', /grunt-postcss/);
		});

		it('adds the package to the task and watch file', function () {
			assert.fileContent('package.json', /grunt-postcss/);
			assert.fileContent(helpersPath + '_grunt/postcss.js', /lost/);
			assert.fileContent(helpersPath + '_grunt/chokidar.js', /postcss:dev/);
		});

		it('adds the task to the Gruntfile file', function () {
			assert.fileContent('Gruntfile.js', /postcss:dev/);
		});
	});

	describe('when Include-Media is selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'cssLibs': [
				'include-media'
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
			assert.fileContent('package.json', /include-media/);
		});

		it('adds import state to styles.scss', function () {
			assert.fileContent(srcPath + 'shared/styles/helpers/_helpers.scss', /include-media/);
		});
	});

});