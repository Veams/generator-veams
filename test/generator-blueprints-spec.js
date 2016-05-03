/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');

describe('Blueprints generator', function () {

	describe('when name is slider', function () {
		var answers = {
			bpName: 'slider',
			bpWithWrapWith: false,
			bpWithJs: true,
			bpType: 'c-'
		};

		var tmpPath = 'tmp/' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'tmp': true,
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(answers.bpName)
				.withPrompts(answers)
				.on('end', done);
		});

		it('creates files', function () {
			var expected = [
				tmpPath + '/usage/README.md',
				tmpPath + '/data/' + answers.bpName + '-bp.json',
				tmpPath + '/partials/c-' + answers.bpName + '.hbs',
				tmpPath + '/scss/_c-' + answers.bpName + '.scss',
				tmpPath + '/js/' + answers.bpName + '.js'
			];
			assert.file(expected);
		});

		it('adds its namespace to all files', function () {
			assert.fileContent([
				[tmpPath + '/usage/README.md', /# slider/],
				[tmpPath + '/data/' + answers.bpName + '-bp.json', /\"sliderContextClass\"/],
				[tmpPath + '/partials/c-' + answers.bpName + '.hbs', /c-slider/],
				[tmpPath + '/scss/_c-' + answers.bpName + '.scss', /slider/],
				[tmpPath + '/js/' + answers.bpName + '.js', /Slider/]
			]);
		});

	});

	describe('when blueprints type is component', function () {
		var answers = {
			bpName: 'slider',
			bpWithWrapWith: false,
			bpWithJs: false
		};

		var tmpPath = 'tmp/' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'component': true,
					'tmp': true,
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(answers.bpName)
				.withPrompts(answers)
				.on('end', done);
		});

		it('adds prefix to files', function () {
			var expected = [
				tmpPath + '/partials/c-' + answers.bpName + '.hbs',
				tmpPath + '/scss/_c-' + answers.bpName + '.scss'
			];
			assert.file(expected);
		});

		it('adds its type to all files', function () {
			assert.fileContent([
				[tmpPath + '/usage/README.md', /component/],
				[tmpPath + '/partials/c-' + answers.bpName + '.hbs', /c-slider/],
				[tmpPath + '/scss/_c-' + answers.bpName + '.scss', /Component/]
			]);
		});

	});

	describe('when blueprints type is block', function () {
		var answers = {
			bpName: 'test-block',
			bpWithWrapWith: false,
			bpWithJs: false
		};

		var tmpPath = 'tmp/' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'block': true,
					'tmp': true,
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(answers.bpName)
				.withPrompts(answers)
				.on('end', done);
		});

		it('adds prefix to files', function () {
			var expected = [
				tmpPath + '/partials/b-' + answers.bpName + '.hbs',
				tmpPath + '/scss/_b-' + answers.bpName + '.scss'
			];
			assert.file(expected);
		});

		it('adds its type to all files', function () {
			assert.fileContent([
				[tmpPath + '/usage/README.md', /block/],
				[tmpPath + '/partials/b-' + answers.bpName + '.hbs', /b-test-block/],
				[tmpPath + '/scss/_b-' + answers.bpName + '.scss', /Block/]
			]);
		});

	});

	describe('when blueprints type is utility', function () {
		var answers = {
			bpName: 'test-util',
			bpWithWrapWith: false,
			bpWithJs: false
		};

		var tmpPath = 'tmp/' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'utility': true,
					'tmp': true,
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(answers.bpName)
				.withPrompts(answers)
				.on('end', done);
		});

		it('adds prefix to files', function () {
			var expected = [
				tmpPath + '/partials/u-' + answers.bpName + '.hbs',
				tmpPath + '/scss/_u-' + answers.bpName + '.scss'
			];
			assert.file(expected);
		});

		it('adds its type to all files', function () {
			assert.fileContent([
				[tmpPath + '/usage/README.md', /utility/],
				[tmpPath + '/partials/u-' + answers.bpName + '.hbs', /u-test-util/],
				[tmpPath + '/scss/_u-' + answers.bpName + '.scss', /Utility/]
			]);
		});

	});

	describe('when blueprints type is custom', function () {
		var answers = {
			bpName: 'test-custom',
			bpWithWrapWith: false,
			bpWithJs: false,
			customType: 'k',
			customFolder: 'custom'
		};

		var tmpPath = 'tmp/' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'custom': true,
					'tmp': true,
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(answers.bpName)
				.withPrompts(answers)
				.on('end', done);
		});

		it('adds prefix to files', function () {
			var expected = [
				tmpPath + '/partials/k-' + answers.bpName + '.hbs',
				tmpPath + '/scss/_k-' + answers.bpName + '.scss'
			];
			assert.file(expected);
		});

		it('adds its type to all files', function () {
			assert.fileContent([
				[tmpPath + '/usage/README.md', /custom/],
				[tmpPath + '/partials/k-' + answers.bpName + '.hbs', /k-test-custom/],
				[tmpPath + '/scss/_k-' + answers.bpName + '.scss', /Custom/]
			]);
		});

	});

	describe('when blueprints is wrap with template', function () {
		var answers = {
			bpName: 'test-util',
			bpWithWrapWith: true,
			bpWithJs: false
		};

		var tmpPath = 'tmp/' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'utility': true,
					'tmp': true,
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(answers.bpName)
				.withPrompts(answers)
				.on('end', done);
		});

		it('adds yield placeholder to the partial', function () {
			assert.fileContent([
				[tmpPath + '/partials/u-' + answers.bpName + '.hbs', /yield/]
			]);
		});

		it('adds another snippet to the README.md', function () {
			assert.fileContent([
				[tmpPath + '/usage/README.md', /{{#wrapWith \"u-test-util\"}}/]
			]);
		});
	});

	describe('when blueprints a JavaScript module', function () {
		var answers = {
			bpName: 'test-module',
			bpWithWrapWith: false,
			bpWithJs: true
		};

		var tmpPath = 'tmp/' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'component': true,
					'tmp': true,
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(answers.bpName)
				.withPrompts(answers)
				.on('end', done);
		});

		it('adds upper camel case name', function () {
			assert.fileContent([
				[tmpPath + '/js/' + answers.bpName + '.js', /TestModule/]
			]);
		});

		it('adds a data reference in markup', function () {
			assert.fileContent([
				[tmpPath + '/partials/c-' + answers.bpName + '.hbs', /data-js-module=\"test-module\"/]
			]);
		});

		it('adds multiple references in README.md', function () {
			assert.fileContent([
				[tmpPath + '/usage/README.md', /Init TestModule/],
				[tmpPath + '/usage/README.md', /import TestModule from/],
				[tmpPath + '/usage/README.md', /EVENTS\.testModule/]
			]);
		});
	});
});