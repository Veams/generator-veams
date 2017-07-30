/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');

describe('Documentation', function () {
	// const helperPath = 'configs/';
	// const srcPath = 'src/';
	//
	// describe('when JavaScript Documenation will be installed in Grunt', function () {
	// 	const answers = require('../test_helpers/prompt-answer-factory')({
	// 		'taskRunner': 'grunt',
	// 		'docs': [
	// 			'jsdoc'
	// 		]
	// 	});
	//
	// 	beforeEach(function (done) {
	// 		helpers.run(path.join(__dirname, '../generators/app'))
	// 			.inDir(path.join(__dirname, 'tmp'))
	// 			.withOptions({
	// 				'skip-install': true,
	// 				'skip-welcome-message': true
	// 			})
	// 			.withPrompts(answers)
	// 			.on('end', done);
	// 	});
	//
	// 	it('creates all doc files', function () {
	// 		const expected = [
	// 			helperPath + '_grunt/jsdoc.js',
	// 			helperPath + 'task-configs/jsdoc.conf.json',
	// 			srcPath + 'js/README.md'
	// 		];
	// 		assert.file(expected);
	// 	});
	//
	// 	it('adds references to package.json', function () {
	// 		assert.fileContent('package.json', /grunt-jsdoc/);
	// 	});
	//
	// 	it('creates helper files', function () {
	// 		assert.file(helperPath + '_grunt/jsdoc.js');
	// 	});
	//
	// 	it('adds task to concurrent.js file', function () {
	// 		assert.fileContent(helperPath + '_grunt/concurrent.js', /\'jsdoc\'/);
	// 	});
	// });
	//
	// describe('When Sass Documenation will be installed in Grunt', function () {
	// 	const answers = require('../test_helpers/prompt-answer-factory')({
	// 		'taskRunner': 'grunt',
	// 		'docs': [
	// 			'sassdoc'
	// 		]
	// 	});
	//
	// 	beforeEach(function (done) {
	// 		helpers.run(path.join(__dirname, '../generators/app'))
	// 			.inDir(path.join(__dirname, 'tmp'))
	// 			.withOptions({
	// 				'skip-install': true,
	// 				'skip-welcome-message': true
	// 			})
	// 			.withPrompts(answers)
	// 			.on('end', done);
	// 	});
	//
	// 	it('creates all doc files', function () {
	// 		const expected = [
	// 			helperPath + '_grunt/sassdoc.js',
	// 			helperPath + 'task-configs/sassdoc.conf.json'
	// 		];
	// 		assert.file(expected);
	// 	});
	//
	// 	it('adds references to package.json', function () {
	// 		assert.fileContent('package.json', /grunt-sassdoc/);
	// 	});
	//
	// 	it('creates helper files', function () {
	// 		assert.file(helperPath + '_grunt/sassdoc.js');
	// 	});
	//
	// 	it('adds task to concurrent.js file', function () {
	// 		assert.fileContent(helperPath + '_grunt/concurrent.js', /\'sassdoc\'/);
	// 	});
	// });
	// describe('When HTML Documenation will be installed in Grunt', function () {
	// 	const answers = require('../test_helpers/prompt-answer-factory')({
	// 		'taskRunner': 'grunt',
	// 		'templateEngine': 'assemble',
	// 		'docs': [
	// 			'htmldoc'
	// 		]
	// 	});
	//
	// 	beforeEach(function (done) {
	// 		helpers.run(path.join(__dirname, '../generators/app'))
	// 			.inDir(path.join(__dirname, 'tmp'))
	// 			.withOptions({
	// 				'skip-install': true,
	// 				'skip-welcome-message': true
	// 			})
	// 			.withPrompts(answers)
	// 			.on('end', done);
	// 	});
	//
	// 	it('creates all doc files', function () {
	// 		const expected = [
	// 			helperPath + '_grunt/assemble.js',
	// 			srcPath + 'scss/docs.scss'
	// 		];
	// 		assert.file(expected);
	// 	});
	// });
	//
	// describe('When JavaScript Documenation will be installed in Gulp', function () {
	// 	const answers = require('../test_helpers/prompt-answer-factory')({
	// 		'taskRunner': 'gulp',
	// 		'docs': [
	// 			'jsdoc'
	// 		]
	// 	});
	//
	// 	beforeEach(function (done) {
	// 		helpers.run(path.join(__dirname, '../generators/app'))
	// 			.inDir(path.join(__dirname, 'tmp'))
	// 			.withOptions({
	// 				'skip-install': true,
	// 				'skip-welcome-message': true
	// 			})
	// 			.withPrompts(answers)
	// 			.on('end', done);
	// 	});
	//
	// 	it('creates all doc files', function () {
	// 		const expected = [
	// 			helperPath + '_gulp/docs.js',
	// 			helperPath + 'task-configs/jsdoc.conf.json',
	// 			srcPath + 'js/README.md'
	// 		];
	// 		assert.file(expected);
	// 	});
	//
	// 	it('adds references to package.json', function () {
	// 		assert.fileContent('package.json', /gulp-jsdoc/);
	// 	});
	// });
	//
	// describe('When Sass Documenation will be installed in Gulp', function () {
	// 	const answers = require('../test_helpers/prompt-answer-factory')({
	// 		'taskRunner': 'gulp',
	// 		'docs': [
	// 			'sassdoc'
	// 		]
	// 	});
	//
	// 	beforeEach(function (done) {
	// 		helpers.run(path.join(__dirname, '../generators/app'))
	// 			.inDir(path.join(__dirname, 'tmp'))
	// 			.withOptions({
	// 				'skip-install': true,
	// 				'skip-welcome-message': true
	// 			})
	// 			.withPrompts(answers)
	// 			.on('end', done);
	// 	});
	//
	// 	it('creates all doc files', function () {
	// 		const expected = [
	// 			helperPath + '_gulp/docs.js',
	// 			helperPath + 'task-configs/sassdoc.conf.json'
	// 		];
	// 		assert.file(expected);
	// 	});
	//
	// 	it('adds references to package.json', function () {
	// 		assert.fileContent('package.json', /sassdoc/);
	// 	});
	// });
});