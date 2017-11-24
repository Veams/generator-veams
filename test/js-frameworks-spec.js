/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');

describe('JavaScript Frameworks', function () {
	const srcPath = 'src/app/';
	const helperPath = 'configs/tasks/_grunt/';

	describe('when Veams-Query is selected', function () {
		let answers = require('../test_helpers/prompt-answer-factory')({
			'gruntModules': [
				'grunt-browserify'
			],
			'jsLibs': [
				'veams-query'
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

		it('adds the package to package.json', function () {
			assert.fileContent('package.json', /veams-query/);
		});

		it('adds import state to app.veams.js', function () {
			assert.fileContent(srcPath + 'app.veams.js', /veams-query/);
		});
	});

	describe('when jQuery is selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'gruntModules': [
				'grunt-browserify'
			],
			'jsLibs': [
				'jquery'
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

		it('adds the package to package.json', function () {
			assert.fileContent('package.json', /jquery/);
		});

		it('adds import state to app.veams.js', function () {
			assert.fileContent(srcPath + 'app.veams.js', /jquery/);
		});
	});

	describe('when Redux is selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'gruntModules': [
				'grunt-browserify'
			],
			'jsLibs': [
				'redux'
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

		it('adds the package to package.json', function () {
			assert.fileContent('package.json', /redux/);
			assert.fileContent('package.json', /veams-bp-redux/);
		});

		it('adds app.store.js', function () {
			assert.file(srcPath + 'app.store.js');
		});
	});

	describe('when React is selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'projectType': 'single-page-app',
			'gruntModules': [
				'grunt-browserify'
			],
			'jsLibs': [
				'react'
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

		it('adds the package to package.json', function () {
			assert.fileContent('package.json', /react/);
			assert.fileContent('package.json', /veams-bp-react-container/);
		});

		it('adds references in app.js', function () {
			assert.fileContent(srcPath + 'app.js', /React/);
		});
	});

	describe('when RxJS is selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'jsLibs': [
				'rxjs'
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

		it('adds the package to package.json', function () {
			assert.fileContent('package.json', /rxjs/);
		});
	});

	describe('when no JS framework is selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'jsLibs': []
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

		it('removes all packages from package.json', function () {
			assert.noFileContent('package.json', /redux|redux|react|jquery|veams-query/);
		});
		it('removes blueprints from veams-cli.json', function () {
			assert.noFileContent('veams-cli.json', /store|container|api/);
		});
	});
});