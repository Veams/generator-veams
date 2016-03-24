/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');

describe('veams extensions', function () {
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
			assert.fileContent('bower.json', /veams-sass/);
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

		it('contains reference in bower.json', function () {
			assert.fileContent('bower.json', /veams-js/);
		});

		it('adds references to package.json', function () {
			assert.fileContent('package.json', /grunt-browserify/);
			assert.fileContent('package.json', /grunt-contrib-handlebars/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + '_grunt/browserify.js');
			assert.file(helperPath + "_grunt/handlebars.js");
		});

		it('adds task to Gruntfile.js file', function () {
			assert.fileContent('Gruntfile.js', /'browserify\:dev'/);
			assert.fileContent('Gruntfile.js', /'browserify\:vendor'/);
			assert.fileContent('Gruntfile.js', /'browserify\:dist'/);
			assert.fileContent('Gruntfile.js', /handlebars/);
		});

		it('adds event endpoint to config.js file', function () {
			assert.fileContent('helpers/config.js', /'resources\/js\/utils\/events.js'/);
		});

		it('adds app.js, main.js and config.js to js folder', function () {
			assert.file([
				srcPath + 'js/app.js',
				srcPath + 'js/main.js'
			]);
		});

		it('adds INSERPOINT to sass file', function () {
			assert.fileContent(srcPath + 'scss/styles.scss', /@INSERTPOINT :: @ref: veamsJS-scss-import, @keep: false/);
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

	describe('when veams is not installed', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"templateEngine": "assemble",
			"veamsPackages": []
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
			assert.noFileContent('bower.json', /veams-components|veams-sass|veams-js/);
		});
	});


});