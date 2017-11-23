/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');
const answers = require('../test_helpers/prompt-answer-factory')({
	testAndQA: true,
	"testAndQALibs": [
		"jscs"
	]
});


describe('grunt-jscs', function () {
	const helperPath = 'configs/tasks/';

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
		assert.fileContent('package.json', /grunt-jscs/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/jscs.js");
	});

	//it('adds task to concurrent.js file', function () {
	//	assert.fileContent(helperPath + "_grunt/concurrent.js", /\'jsdoc\'/);
	//});

	//it('adds README.md to js folder and adds jsdoc.conf.json', function () {
	//	assert.file([
	//		''src/js/README.md',
	//		helperPath + 'task-configs/jsdoc.conf.json'
	//	]);
	//});
});