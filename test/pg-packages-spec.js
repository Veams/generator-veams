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
			"installAssemble": true,
			"pgPackages": [
				"pgMethodology"
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
				srcPath + "templates/layouts/README.md",
				srcPath + "templates/partials/panels/README.md",
				srcPath + "templates/partials/blocks/README.md",
				srcPath + "templates/partials/components/README.md",
				srcPath + "templates/partials/modules/README.md"
			];
			assert.file(expected);
		});

	});

	describe('when pg-scss is installed', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"installAssemble": true,
			"pgPackages": [
				"pgSCSS"
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
			assert.fileContent('bower.json', /pg-scss/);
		});
	});

	describe('when pg-js is installed', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"installAssemble": true,
			"pgPackages": [
				"pgJS"
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
			assert.fileContent('bower.json', /pg-js/);
		});
	});

	describe('when pg-components is installed', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"installAssemble": true,
			"pgPackages": [
				"pgComponents"
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
			assert.fileContent('bower.json', /pg-components/);
		});
	});

	describe('when pg is not installed', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"installAssemble": true,
			"pgPackages": [
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
			assert.noFileContent('bower.json', /pg-components|pg-scss|pg-js/);
		});
	});


});