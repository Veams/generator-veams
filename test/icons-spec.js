/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const srcPath = 'src/app/shared/';
const helperPath = 'configs/tasks/';
const iconsConfig = require('../mini-generators/icons/config');


describe('Icons', function () {

	describe('when "Webfont" was chosen', function () {

		const answers = require('../test_helpers/prompt-answer-factory')({
			icons: [
				iconsConfig.webfontId
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
			assert.fileContent('package.json', /webfonts-generator/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + '/icons/webfont.js');
			assert.file(helperPath + '/icons/icons.config.js');
		});

		it('creates custom template file', function () {
			assert.file(helperPath + '/icons/templates/webfont-scss.hbs');
		});

		it('adds tasks to package.json file', function () {
			assert.fileContent('package.json', /webfont:generate/);
		});

	});

	describe('when "Sprites" was chosen', function () {

		const answers = require('../test_helpers/prompt-answer-factory')({
			icons: [
				iconsConfig.spriteId
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
			assert.fileContent('package.json', /dr-svg-sprites/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + '/icons/sprite.js');
			assert.file(helperPath + '/icons/icons.config.js');
		});

		it('creates custom template file', function () {
			assert.file(helperPath + '/icons/templates/sprite.hbs');
		});

		it('adds tasks to package.json file', function () {
			assert.fileContent('package.json', /\"sprite:generate\"/);
		});

	});
	describe('when "Grunticon" was chosen', function () {

		const answers = require('../test_helpers/prompt-answer-factory')({
			icons: [
				iconsConfig.iconGrunticonId
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
			assert.fileContent('package.json', /grunticon-lib/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + '/icons/grunticon.js');
			assert.file(helperPath + '/icons/icons.config.js');
		});

		it('adds tasks to package.json file', function () {
			assert.fileContent('package.json', /\"grunticon:generate\"/);
		});

	});

	describe('when no icon workflow is chosen', function () {

		const answers = require('../test_helpers/prompt-answer-factory')({
			icons: [
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

		it('removes packages to package.json', function () {
			assert.noFileContent('package.json', /dr-svg-sprites|webfonts-generator|grunticon-lib/);
		});

		it('does not contain tasks in package.json file', function () {
			assert.noFileContent('package.json', /\"sprite:generate\"|webfont:generate|grunticon:generate/);
		});

	});
});