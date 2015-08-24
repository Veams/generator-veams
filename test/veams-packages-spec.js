/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');

describe('pg packages', function () {
	var helperPath = "helpers/";
	var srcPath = "resources/";

	describe('when pg methodology is installed', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"templateEngine": "assemble",
			"veamsPackages": [
				"veamsMethodology"
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

		it('creates READMEs', function () {
			var expected = [
				srcPath + "templating/layouts/README.md",
				srcPath + "templating/partials/README.md",
				srcPath + "templating/partials/blocks/README.md",
				srcPath + "templating/partials/components/README.md"
			];
			assert.file(expected);
		});

	});

	describe('when veams-scss is installed', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"templateEngine": "assemble",
			"veamsPackages": [
				"veamsSCSS"
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

		it('bower.json contains reference', function () {
			assert.fileContent('bower.json', /veams-scss/);
		});
	});

	describe('when veams-js is installed', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"templateEngine": "assemble",
			"veamsPackages": [
				"veamsJS"
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

		it('bower.json contains reference', function () {
			assert.fileContent('bower.json', /veams-js/);
		});
	});

	describe('when veams-components is installed', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"templateEngine": "assemble",
			"veamsPackages": [
				"veamsComponents"
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

		it('bower.json contains reference', function () {
			assert.fileContent('bower.json', /veams-components/);
		});
	});

	describe('when pg is not installed', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"templateEngine": "assemble",
			"veamsPackages": [
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

		it('bower.json contains no references', function () {
			assert.noFileContent('bower.json', /veams-components|veams-scss|veams-js/);
		});
	});


});