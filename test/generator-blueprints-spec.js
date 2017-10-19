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

		const tmpPath = './src/' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(`${answers.bpName} ./src`)
				.withPrompts(answers)
				.on('end', done);
		});

		it('creates files', function () {
			const expected = [
				tmpPath + '/README.md',
				tmpPath + '/INSERTPOINTS.md',
				tmpPath + '/' + answers.bpName + '.settings.json',
				tmpPath + '/data/' + answers.bpName + '-bp.json',
				tmpPath + '/templates/c-' + answers.bpName + '.hbs',
				tmpPath + '/styles/_c-' + answers.bpName + '.scss',
				tmpPath + '/scripts/' + answers.bpName + '.js'
			];
			assert.file(expected);
		});

		it('adds its namespace to all files', function () {
			assert.fileContent([
				[tmpPath + '/README.md', /# slider/],
				[tmpPath + '/data/' + answers.bpName + '-bp.json', /\"sliderContextClass\"/],
				[tmpPath + '/templates/c-' + answers.bpName + '.hbs', /c-slider/],
				[tmpPath + '/styles/_c-' + answers.bpName + '.scss', /slider/],
				[tmpPath + '/scripts/' + answers.bpName + '.js', /Slider/]
			]);
		});

	});

	describe('when name includes path', function () {
		const name = 'slider';
		const answers = {
			bpName: name,
			bpWithWrapWith: false,
			bpWithJs: true,
			bpTypeName: 'component',
			bpTypePrefix: 'c'
		};

		const tmpPath = './src/shared/components/' + name;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(`${answers.bpName} ./src/shared/components/`)
				.withPrompts(answers)
				.on('end', done);
		});

		it('creates files', function () {
			const expected = [
				tmpPath + '/README.md',
				tmpPath + '/INSERTPOINTS.md',
				tmpPath + '/' + name + '.settings.json',
				tmpPath + '/data/' + name + '-bp.json',
				tmpPath + '/templates/c-' + name + '.hbs',
				tmpPath + '/styles/_c-' + name + '.scss',
				tmpPath + '/scripts/' + name + '.js'
			];
			assert.file(expected);
		});

		it('adds its namespace to all files', function () {
			assert.fileContent([
				[tmpPath + '/README.md', /# slider/],
				[tmpPath + '/' + name + '.settings.json', /slider/],
				[tmpPath + '/data/' + name + '-bp.json', /\"sliderContextClass\"/],
				[tmpPath + '/templates/c-' + name + '.hbs', /c-slider/],
				[tmpPath + '/styles/_c-' + name + '.scss', /slider/],
				[tmpPath + '/scripts/' + name + '.js', /Slider/]
			]);
		});

	});

	describe('when blueprints type is component', function () {
		const answers = {
			bpName: 'slider',
			bpWithWrapWith: false,
			bpWithJs: false
		};

		const tmpPath = './src/' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'component': true,
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(`${answers.bpName} ./src`)
				.withPrompts(answers)
				.on('end', done);
		});

		it('adds prefix to files', function () {
			const expected = [
				tmpPath + '/templates/c-' + answers.bpName + '.hbs',
				tmpPath + '/styles/_c-' + answers.bpName + '.scss'
			];
			assert.file(expected);
		});

		it('adds its type to all files', function () {
			assert.fileContent([
				[tmpPath + '/INSERTPOINTS.md', /component/],
				[tmpPath + '/templates/c-' + answers.bpName + '.hbs', /c-slider/],
				[tmpPath + '/styles/_c-' + answers.bpName + '.scss', /component/]
			]);
		});

	});

	describe('when blueprints type is utility', function () {
		const answers = {
			bpName: 'test-util',
			bpWithWrapWith: false,
			bpWithJs: false
		};

		const tmpPath = './src/' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'utility': true,
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(`${answers.bpName} ./src`)
				.withPrompts(answers)
				.on('end', done);
		});

		it('adds prefix to files', function () {
			const expected = [
				tmpPath + '/templates/u-' + answers.bpName + '.hbs',
				tmpPath + '/styles/_u-' + answers.bpName + '.scss'
			];
			assert.file(expected);
		});

		it('adds its type to all files', function () {
			assert.fileContent([
				[tmpPath + '/INSERTPOINTS.md', /utility/],
				[tmpPath + '/templates/u-' + answers.bpName + '.hbs', /u-test-util/],
				[tmpPath + '/styles/_u-' + answers.bpName + '.scss', /utility/]
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

		const tmpPath = './src/' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'custom': true,
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(`${answers.bpName} ./src`)
				.withPrompts(answers)
				.on('end', done);
		});

		it('adds prefix to files', function () {
			const expected = [
				tmpPath + '/templates/k-' + answers.bpName + '.hbs',
				tmpPath + '/styles/_k-' + answers.bpName + '.scss'
			];
			assert.file(expected);
		});

		it('adds its type to all files', function () {
			assert.fileContent([
				[tmpPath + '/INSERTPOINTS.md', /custom/],
				[tmpPath + '/templates/k-' + answers.bpName + '.hbs', /k-test-custom/],
				[tmpPath + '/styles/_k-' + answers.bpName + '.scss', /collection/]
			]);
		});

	});

	describe('when blueprints is wrap with template', function () {
		const answers = {
			bpName: 'test-util',
			bpWithWrapWith: true,
			bpWithJs: false
		};

		const tmpPath = './src/' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'utility': true,
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(`${answers.bpName} ./src`)
				.withPrompts(answers)
				.on('end', done);
		});

		it('adds yield placeholder to the partial', function () {
			assert.fileContent([
				[tmpPath + '/templates/u-' + answers.bpName + '.hbs', /yield/]
			]);
		});

		it('adds another snippet to the INSERTPOINTS.md', function () {
			assert.fileContent([
				[tmpPath + '/INSERTPOINTS.md', /{{#wrapWith \"u-test-util\"}}/]
			]);
		});
	});

	describe('when blueprints is a JavaScript module', function () {
		const answers = {
			bpName: 'test-module',
			bpWithWrapWith: false,
			bpWithJs: true
		};

		const tmpPath = './src/' + answers.bpName;

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/blueprint'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'component': true,
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withArguments(`${answers.bpName} ./src`)
				.withPrompts(answers)
				.on('end', done);
		});

		it('adds upper camel case name', function () {
			assert.fileContent([
				[tmpPath + '/scripts/' + answers.bpName + '.js', /TestModule/]
			]);
		});

		it('adds a data reference in markup', function () {
			assert.fileContent([
				[tmpPath + '/templates/c-' + answers.bpName + '.hbs', /data-js-module=\"test-module\"/]
			]);
		});

		it('adds multiple references in README.md', function () {
			assert.fileContent([
				[tmpPath + '/INSERTPOINTS.md', /Init TestModule/],
				[tmpPath + '/INSERTPOINTS.md', /EVENTS\.testModule/]
			]);
		});
	});
});