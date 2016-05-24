/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');

describe('Mangony', function () {
	var srcPath = 'resources/';
	var helperPath = 'helpers/';


	describe('adds standard files and configs to project', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			'templateEngine': 'mangony',
			'mangonyExpress': false
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

		it('creates resources files', function () {
			var expected = [
				srcPath + 'templating/data/config.json',
				srcPath + 'templating/helpers/alias.js',
				srcPath + 'templating/helpers/helper-wrapWith.js',
				srcPath + 'templating/helpers/helper-for.js',
				srcPath + 'templating/helpers/helper-ifBlock.js',
				srcPath + 'templating/helpers/helper-limit.js',
				srcPath + 'templating/helpers/helper-mergeData.js',
				srcPath + 'templating/helpers/helper-syntax.js',
				srcPath + 'templating/helpers/helper-xif.js',
				srcPath + 'templating/helpers/helper-concatPath.js',
				srcPath + 'templating/helpers/helper-markdown.js',
				srcPath + 'templating/helpers/helper-pictureData.js',
				srcPath + 'templating/layouts/lyt-default.hbs',
				srcPath + 'templating/pages/index.hbs',
				srcPath + 'templating/partials/_global/_scripts.hbs',
				srcPath + 'templating/partials/_global/_metadata.hbs',
				srcPath + 'templating/partials/_global/_styles.hbs'
			];
			helpers.assertFiles(expected);

		});

		it('adds paths to config.js', function () {
			assert.fileContent(helperPath + 'config.js', /'resources\/templating\/pages'/);
			assert.fileContent(helperPath + 'config.js', /partials/);
		});

		it('the index.hbs contains extend syntax', function () {
			assert.fileContent(srcPath + 'templating/pages/index.hbs', /{{#extend/);
		});
	});
	describe('Grunt installation', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			'templateEngine': 'mangony',
			'mangonyExpress': false
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
			assert.fileContent('package.json', /grunt-mangony/);
			assert.noFileContent('package.json', /grunt-open/);
		});

		it('creates helper files', function () {
			helpers.assertFile(helperPath + '_grunt/mangony.js');
		});

		it('adds and deletes task to Gruntfile.js file', function () {
			assert.fileContent('Gruntfile.js', /mangony:dev/);
			assert.fileContent('Gruntfile.js', /mangony:dist/);
			assert.noFileContent('Gruntfile.js', /open:dev/);
		});
	});
	describe('Grunt-express installation', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			'templateEngine': 'mangony',
			'mangonyExpress': true
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
			helpers.assertFile('package.json', /grunt-mangony/);
			helpers.assertFile('package.json', /mangony/);
			helpers.assertFile('package.json', /deep-extend/);
			helpers.assertFile('package.json', /grunt-open/);

		});

		it('adds scripts to server/main.js', function () {
			assert.fileContent('server/main.js', /Mangony/);
			assert.fileContent('server/main.js', /'deep-extend'/);
			assert.fileContent('server/main.js', /mangonyServer.render()/);
		});

		it('adds task to Gruntfile.js file', function () {
			assert.noFileContent('Gruntfile.js', /mangony:dev/);
			assert.fileContent('Gruntfile.js', /mangony:dist/);
			assert.fileContent('Gruntfile.js', /open:dev/);
		});
	});

	describe('Gulp installation', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			'taskRunner': ['gulp'],
			'gruntModules': [],
			'templateEngine': 'mangony'
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
			assert.fileContent('package.json', /mangony/);
			assert.noFileContent('package.json', /grunt-mangony/);
		});

		it('creates helper files', function () {
			helpers.assertFile(helperPath + '_gulp/html.js');
		});

		it('adds and deletes task to Gulpfile.js file', function () {
			assert.fileContent('Gulpfile.js', /mangony:dev/);
			assert.fileContent('Gulpfile.js', /mangony:dist/);
		});
	});
});
