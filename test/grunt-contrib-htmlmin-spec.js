/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');
const answers = require('../test_helpers/prompt-answer-factory')({
	"gruntModules":[
		"grunt-contrib-htmlmin"
	]
});

describe('grunt-contrib-htmlmin', function () {
	const helperPath = "helpers/";

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
		assert.fileContent('package.json', /grunt-contrib-htmlmin/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/htmlmin.js");
	});


	it('adds task to concurrent.js file', function () {
		assert.fileContent(helperPath + "_grunt/concurrent.js", /\'htmlmin\'/);
	});

});