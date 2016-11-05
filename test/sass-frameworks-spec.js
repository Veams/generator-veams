/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');

describe('Sass Frameworks', function () {
	var srcPath = "resources/";
	var helpersPath = "helpers/";

	describe('when Bootstrap-Sass is selected', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"cssLibs": [
				"bootstrap-sass"
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

		it('adds the package to bower.json', function () {
			assert.fileContent('bower.json', /bootstrap-sass/);
		});

		it('adds import state to styles.scss', function () {
			assert.fileContent(srcPath + 'scss/styles.scss', /bootstrap/);
		});

		it('adds comment to _vars.scss', function () {
			assert.fileContent(srcPath + 'scss/global/_vars.scss', /BOOTSTRAP/);
		});
	});

	describe('when Foundation is selected', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"cssLibs": [
				"foundation"
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

		it('adds the package to bower.json', function () {
			assert.fileContent('bower.json', /foundation/);
		});

		it('adds import state to styles.scss', function () {
			assert.fileContent(srcPath + 'scss/styles.scss', /foundation/);
		});

		it('adds comment to _vars.scss', function () {
			assert.fileContent(srcPath + 'scss/global/_vars.scss', /FOUNDATION/);
		});
	});

	describe('when Bourbon Neat is selected', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"cssLibs": [
				"neat"
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

		it('adds the package to bower.json', function () {
			assert.fileContent('bower.json', /bourbon/);
			assert.fileContent('bower.json', /neat/);
		});

		it('adds import state to styles.scss', function () {
			assert.fileContent(srcPath + 'scss/styles.scss', /bourbon/);
			assert.fileContent(srcPath + 'scss/styles.scss', /neat/);
		});

		it('adds comment to _vars.scss', function () {
			assert.fileContent(srcPath + 'scss/global/_vars.scss', /BOURBON/);
		});
	});

	describe('when Lost Grid is selected', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"cssLibs": [
				"lost-grid"
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
			assert.fileContent(srcPath + 'scss/global/_vars.scss', /LOST/);
		});
	});

	describe('when Lost Grid and Grunt is selected', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"cssLibs": [
				"lost-grid"
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

	describe('when Lost Grid and Gulp is selected', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			'taskRunner': [
				'gulp'
			],
			"cssLibs": [
				"lost-grid"
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

		it('adds the package to the task file', function () {
			assert.fileContent('package.json', /gulp-postcss/);
			assert.fileContent(helpersPath + '_gulp/styles.js', /lost/);
		});
	});

});