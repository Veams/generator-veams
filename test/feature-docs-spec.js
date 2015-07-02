/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');

describe('feature docs', function () {
	var helperPath = "helpers/";
	var srcPath = "resources/";

	describe('when docs will be installed', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({
			"templateEngine": "assemble",
			"features": [
				"installDocs"
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
				helperPath + "_grunt/copy.js",
				helperPath + "_grunt/jsdoc.js",
				helperPath + "task-configs/jsdoc.conf.json",
				srcPath + "js/README.md",
				srcPath + "templating/docs/index.hbs",
				srcPath + "scss/docs/_highlight.scss",
				srcPath + "scss/docs/_monokai.scss",
				srcPath + "scss/docs.scss"
			];
			assert.file(expected);
		});
	});
});