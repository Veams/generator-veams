/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const srcPath = 'src/app/shared/';
const helperPath = 'configs/tasks/';


describe('icons-workflow', function () {

	describe('when "Webfont" was chosen', function () {

		const answers = require('../test_helpers/prompt-answer-factory')({
			icons: [
				'webfont'
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
			assert.fileContent('package.json', /grunt-webfont/);
			assert.fileContent('package.json', /fs-extra/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + '_grunt/webfont.js');
			assert.file(helperPath + '_grunt/custom/iconbuilder.js');
		});

		it('adds tasks to Gruntfile.js file', function () {
			assert.fileContent('Gruntfile.js', /\'webfont-icons\'/);
			assert.fileContent('Gruntfile.js', /\'iconbuilder\'/);
		});

	});


	describe('when "CSS Sprites" was chosen', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			"icons": [
				"sprites"
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
			assert.fileContent('package.json', /grunt-dr-svg-sprites/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + "_grunt/dr-svg-sprites.js");
			assert.file("configs/templates/svg-sprites/stylesheet.hbs");
		});

		it('creates icons folder in styles folder', function () {
			assert.file(srcPath + "styles/icons/.gitkeep");
		});

		it('adds task and fallback to Gruntfile.js file', function () {
			assert.fileContent("Gruntfile.js", /\'sprites\'/);
			assert.fileContent("Gruntfile.js", /\'dr-svg-sprites\'/);
		});

		it('adds sub-task to replace.js', function () {
			assert.fileContent(helperPath + "_grunt/replace.js", /spriteUrl/);
		});
	});

	describe('when "Inline SVGs (Grunticon)" was chosen', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			"icons": [
				"grunticon"
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
			assert.fileContent('package.json', /grunt-grunticon/);
			assert.fileContent('package.json', /grunt-text-replace/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + "_grunt/grunticon.js");
			assert.file(helperPath + "_grunt/replace.js");
		});

		it('creates icons folder in styles folder', function () {
			assert.file(srcPath + "styles/icons/.gitkeep");
		});

		it('adds tasks to Gruntfile.js file', function () {
			assert.fileContent("Gruntfile.js", /\'icons\'/);
			assert.fileContent("Gruntfile.js", /\'grunticon\'/);
			assert.fileContent("Gruntfile.js", /\'replace\'/);
		});
	});
});