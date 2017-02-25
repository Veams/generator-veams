/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');

describe('Blueprints generator', function () {

	describe('when name is slider', function () {
		const answers = {
			bpName: 'slider',
			bpWithWrapWith: false,
			bpWithJs: true,
			bpTypeName: 'component',
			bpTypePrefix: 'c'
		};

		const tmpPath = './' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(answers.bpName)
				.withPrompts(answers)
				.on('end', done);
		});

		it('creates files', function () {
			const expected = [
				tmpPath + '/README.md',
				tmpPath + '/INSERTPOINTS.md',
				tmpPath + '/data/' + answers.bpName + '-bp.json',
				tmpPath + '/partials/c-' + answers.bpName + '.hbs',
				tmpPath + '/scss/_c-' + answers.bpName + '.scss',
				tmpPath + '/js/' + answers.bpName + '.js'
			];
			assert.file(expected);
		});

		it('adds its namespace to all files', function () {
			assert.fileContent([
				[tmpPath + '/README.md', /# slider/],
				[tmpPath + '/data/' + answers.bpName + '-bp.json', /\"sliderContextClass\"/],
				[tmpPath + '/partials/c-' + answers.bpName + '.hbs', /c-slider/],
				[tmpPath + '/scss/_c-' + answers.bpName + '.scss', /slider/],
				[tmpPath + '/js/' + answers.bpName + '.js', /Slider/]
			]);
		});

	});

	describe('when blueprints type is component', function () {
		const answers = {
			bpName: 'slider',
			bpWithWrapWith: false,
			bpWithJs: false
		};

		const tmpPath = './' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'component': true,
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(answers.bpName)
				.withPrompts(answers)
				.on('end', done);
		});

		it('adds prefix to files', function () {
			const expected = [
				tmpPath + '/partials/c-' + answers.bpName + '.hbs',
				tmpPath + '/scss/_c-' + answers.bpName + '.scss'
			];
			assert.file(expected);
		});

		it('adds its type to all files', function () {
			assert.fileContent([
				[tmpPath + '/INSERTPOINTS.md', /component/],
				[tmpPath + '/partials/c-' + answers.bpName + '.hbs', /c-slider/],
				[tmpPath + '/scss/_c-' + answers.bpName + '.scss', /component/]
			]);
		});

	});

	describe('when blueprints type is block', function () {
		const answers = {
			bpName: 'test-block',
			bpWithWrapWith: false,
			bpWithJs: false
		};

		const tmpPath = './' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'block': true,
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(answers.bpName)
				.withPrompts(answers)
				.on('end', done);
		});

		it('adds prefix to files', function () {
			const expected = [
				tmpPath + '/partials/b-' + answers.bpName + '.hbs',
				tmpPath + '/scss/_b-' + answers.bpName + '.scss'
			];
			assert.file(expected);
		});

		it('adds its type to all files', function () {
			assert.fileContent([
				[tmpPath + '/INSERTPOINTS.md', /block/],
				[tmpPath + '/partials/b-' + answers.bpName + '.hbs', /b-test-block/],
				[tmpPath + '/scss/_b-' + answers.bpName + '.scss', /block/]
			]);
		});

	});

	describe('when blueprints type is utility', function () {
		const answers = {
			bpName: 'test-util',
			bpWithWrapWith: false,
			bpWithJs: false
		};

		const tmpPath = './' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'utility': true,
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(answers.bpName)
				.withPrompts(answers)
				.on('end', done);
		});

		it('adds prefix to files', function () {
			const expected = [
				tmpPath + '/partials/u-' + answers.bpName + '.hbs',
				tmpPath + '/scss/_u-' + answers.bpName + '.scss'
			];
			assert.file(expected);
		});

		it('adds its type to all files', function () {
			assert.fileContent([
				[tmpPath + '/INSERTPOINTS.md', /utility/],
				[tmpPath + '/partials/u-' + answers.bpName + '.hbs', /u-test-util/],
				[tmpPath + '/scss/_u-' + answers.bpName + '.scss', /utility/]
			]);
		});

	});

	describe('when blueprints type is custom', function () {
		const answers = {
			bpName: 'test-custom',
			bpWithWrapWith: false,
			bpWithJs: false,
			customTypeName: 'collection',
			customTypePrefix: 'k'
		};

		const tmpPath = './' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'custom': true,
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(answers.bpName)
				.withPrompts(answers)
				.on('end', done);
		});

		it('adds prefix to files', function () {
			const expected = [
				tmpPath + '/partials/k-' + answers.bpName + '.hbs',
				tmpPath + '/scss/_k-' + answers.bpName + '.scss'
			];
			assert.file(expected);
		});

		it('adds its type to all files', function () {
			assert.fileContent([
				[tmpPath + '/INSERTPOINTS.md', /custom/],
				[tmpPath + '/partials/k-' + answers.bpName + '.hbs', /k-test-custom/],
				[tmpPath + '/scss/_k-' + answers.bpName + '.scss', /collection/]
			]);
		});

	});

	describe('when blueprint should create a tmp file', function () {
		const answers = {
			bpName: 'test-custom',
			bpWithWrapWith: false,
			bpWithJs: false,
			customTypeName: 'collection',
			customTypePrefix: 'k'
		};

		const tmpPath = './tmp/' + answers.bpName;

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

		it('adds insertpoint file', function () {
			const expected = [
				tmpPath + '/INSERTPOINTS.md'
			];
			assert.file(expected);
		});
	});

	describe('when blueprints is wrap with template', function () {
		const answers = {
			bpName: 'test-util',
			bpWithWrapWith: true,
			bpWithJs: false
		};

		const tmpPath = './' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'utility': true,
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

		it('adds another snippet to the INSERTPOINTS.md', function () {
			assert.fileContent([
				[tmpPath + '/INSERTPOINTS.md', /{{#wrapWith \"u-test-util\"}}/]
			]);
		});
	});

	describe('when blueprints a JavaScript module', function () {
		const answers = {
			bpName: 'test-module',
			bpWithWrapWith: false,
			bpWithJs: true
		};

		const tmpPath = './' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'component': true,
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
				[tmpPath + '/INSERTPOINTS.md', /Init TestModule/],
				[tmpPath + '/INSERTPOINTS.md', /import TestModule from/],
				[tmpPath + '/INSERTPOINTS.md', /EVENTS\.testModule/]
			]);
		});
	});
});