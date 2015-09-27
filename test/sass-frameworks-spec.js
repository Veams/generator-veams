/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');

describe('Sass Frameworks', function () {
	var srcPath = "resources/";

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

});