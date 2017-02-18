/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');

describe('Mangony', function () {
	const srcPath = 'resources/';
	const helperPath = 'helpers/';


	describe('adds standard files and configs to project', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
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
			const expected = [
				srcPath + 'templating/data/config.json',
				srcPath + 'templating/layouts/lyt-default.hbs',
				srcPath + 'templating/pages/index.hbs',
				srcPath + 'templating/partials/_global/_scripts.hbs',
				srcPath + 'templating/partials/_global/_metadata.hbs',
				srcPath + 'templating/partials/_global/_styles.hbs'
			];
			const notExpected = [
				srcPath + 'templating/helpers/alias.js',
				srcPath + 'templating/helpers/helper-wrapWith.js',
				srcPath + 'templating/helpers/helper-ifBlock.js'
			];
			assert.file(expected);
			assert.noFile(notExpected);

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
		const answers = require('../test_helpers/prompt-answer-factory')({
			'templateEngine': 'mangony',
			'mangonyExpress': false,
			'gruntModules': [
				'grunt-browser-sync'
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
			assert.fileContent('package.json', /grunt-mangony/);
			assert.noFileContent('package.json', /grunt-open/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + '_grunt/mangony.js');
		});

		it('adds dependencies and functions to server/main.js', function () {
			assert.noFileContent('server/main.js', /Mangony/);
			assert.noFileContent('server/main.js', /'deep-extend'/);
			assert.noFileContent('server/main.js', /mangonyServer.render()/);
			assert.fileContent('server/main.js', /app.set/);
			assert.fileContent('server/main.js', /app.listen/);
		});

		it('adds and deletes task to Gruntfile.js file', function () {
			assert.fileContent('Gruntfile.js', /mangony:dev/);
			assert.fileContent('Gruntfile.js', /mangony:dist/);
			assert.fileContent('Gruntfile.js', /browserSync/);
			assert.noFileContent('Gruntfile.js', /open:dev/);
		});
	});
	describe('Grunt-express installation', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
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
			assert.fileContent('package.json', /grunt-mangony/);
			assert.fileContent('package.json', /mangony/);
			assert.fileContent('package.json', /deep-extend/);
			assert.fileContent('package.json', /grunt-open/);

		});

		it('adds dependencies and functions to server/main.js', function () {
			assert.fileContent('server/main.js', /Mangony/);
			assert.fileContent('server/main.js', /'deep-extend'/);
			assert.fileContent('server/main.js', /mangonyServer.render()/);
			assert.noFileContent('server/main.js', /app.set/);
			assert.noFileContent('server/main.js', /app.listen/);
		});

		it('adds task to Gruntfile.js file', function () {
			assert.noFileContent('Gruntfile.js', /mangony:dev/);
			assert.noFileContent('Gruntfile.js', /browserSync/);
			assert.fileContent('Gruntfile.js', /mangony:dist/);
			assert.fileContent('Gruntfile.js', /open:dev/);
		});
	});

	describe('Gulp installation', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
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
			assert.noFileContent('package.json', /mangony-hbs-helpers/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + '_gulp/html.js');
		});

		it('adds and deletes task to Gulpfile.js file', function () {
			assert.fileContent('Gulpfile.js', /mangony:dev/);
			assert.fileContent('Gulpfile.js', /mangony:dist/);
		});
	});
});
