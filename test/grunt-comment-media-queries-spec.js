/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"installAssemble": false,
	"features": [
		"mobileFirst"
	]
});

describe('grunt-comment-media-queries', function () {
	var helperPath = "helpers/";
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
		helpers.assertFile('package.json', /grunt-combine-media-queries/);
	});

	it('creates helper files', function () {
		helpers.assertFile(helperPath + "_grunt/comment-media-queries.js");
	});

	it('adds task to Gruntfile.js file', function () {
		helpers.assertFile("Gruntfile.js", /\'comment-media-queries:dist\'/);
	});
});