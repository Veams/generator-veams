/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');

describe('feature extended layouts', function () {
	var helperPath = "helpers/";
	var srcPath = "resources/";

	describe('assemble files', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"templateEngine": "assemble"
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

		it('creates page', function () {
			assert.file(srcPath + "templating/pages/index.hbs");
		});
	});

	describe('when extended layouts will be installed', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"templateEngine": "assemble",
			"installExtendedLayout": true
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

		it('the index.hbs contains extend syntax', function () {
			assert.fileContent(srcPath + "templating/pages/index.hbs", /{{#extend/);
		});
	});

	describe('when extended layouts will not be installed', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"templateEngine": "assemble",
			"installExtendedLayout": false
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

		it('the index.hbs contains simple syntax', function () {
			assert.noFileContent(srcPath + "templating/pages/index.hbs", /{{#extend/);
		});
	});
});