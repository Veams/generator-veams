/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');

describe('Documenation', function () {
	var helperPath = "helpers/";
	var srcPath = "resources/";

	describe('When JavaScript Documenation will be installed and task runner is Grunt', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"taskRunner": "grunt",
			"docs": [
				"jsdoc"
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

		it('creates all doc files', function () {
			var expected = [
				helperPath + "_grunt/jsdoc.js",
				helperPath + "task-configs/jsdoc.conf.json",
				srcPath + "js/README.md"
			];
			assert.file(expected);
		});

		it('adds references to package.json', function () {
			helpers.assertFile('package.json', /grunt-jsdoc/);
		});

		it('creates helper files', function () {
			helpers.assertFile(helperPath + "_grunt/jsdoc.js");
		});

		it('adds task to concurrent.js file', function () {
			helpers.assertFile(helperPath + "_grunt/concurrent.js", /\'jsdoc\'/);
		});
	});

	describe('When Sass Documenation will be installed and task runner is Grunt', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"taskRunner": "grunt",
			"docs": [
				"sassdoc"
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

		it('creates all doc files', function () {
			var expected = [
				helperPath + "_grunt/sassdoc.js",
				helperPath + "task-configs/sassdoc.conf.json"
			];
			assert.file(expected);
		});

		it('adds references to package.json', function () {
			helpers.assertFile('package.json', /grunt-sassdoc/);
		});

		it('creates helper files', function () {
			helpers.assertFile(helperPath + "_grunt/sassdoc.js");
		});

		it('adds task to concurrent.js file', function () {
			helpers.assertFile(helperPath + "_grunt/concurrent.js", /\'sassdoc\'/);
		});
	});

	describe('When JavaScript Documenation will be installed and task runner is Gulp', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"taskRunner": "gulp",
			"docs": [
				"jsdoc"
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

		it('creates all doc files', function () {
			var expected = [
				helperPath + "_gulp/docs.js",
				helperPath + "task-configs/jsdoc.conf.json",
				srcPath + "js/README.md"
			];
			assert.file(expected);
		});

		it('adds references to package.json', function () {
			helpers.assertFile('package.json', /gulp-jsdoc/);
		});
	});

	describe('When Sass Documenation will be installed and task runner is Gulp', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"taskRunner": "gulp",
			"docs": [
				"sassdoc"
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

		it('creates all doc files', function () {
			var expected = [
				helperPath + "_gulp/docs.js",
				helperPath + "task-configs/sassdoc.conf.json"
			];
			assert.file(expected);
		});

		it('adds references to package.json', function () {
			helpers.assertFile('package.json', /sassdoc/);
		});
	});
});