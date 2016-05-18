/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');

describe('Package.json', function () {
	var srcPath = "resources/";

	describe('when Grunt is selected and no plugins are used', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			taskRunner: ['grunt'],
			gruntModules: [],
			templateEngine: false
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

		it('delete all packages dependenies for templating', function () {
			var templateDeps = [
				'grunt-mangony',
				'mangony',
				'assemble'
			];

			assert.noFileContent('package.json', /gulp/);
		});

	});

	describe('when Gulp is selected and no plugins are used', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			taskRunner: ['gulp'],
			gruntModules: [],
			gulpModules: [],
			templateEngine: false
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

		it('delete all packages dependenies for templating', function () {
			assert.noFileContent('package.json', /grunt/);
		});

	});

	describe('when Gulp and Grunt are selected and no plugins are used', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			taskRunner: ['gulp', 'grunt'],
			gruntModules: [],
			gulpModules: [],
			templateEngine: false
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

		it('delete all packages dependenies for templating', function () {
			assert.noFileContent('package.json', /grunt-contrib-watch/);
		});

	});

});