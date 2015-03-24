/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"installAssemble": true
});


describe('assemble', function () {
	var srcPath = "resources/";
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
		helpers.assertFile('package.json', /assemble/);

	});

	it('creates helper files', function () {
		helpers.assertFile(helperPath + "_grunt/assemble.js");

	});

	it('creates resources files', function () {
		var expected = [
			srcPath + "templates/data/config.json",
			srcPath + "templates/helpers/helper-panel.js",
			srcPath + "templates/helpers/helper-for.js",
			srcPath + "templates/helpers/helper-ifBlock.js",
			srcPath + "templates/helpers/helper-limit.js",
			srcPath + "templates/helpers/helper-partial.js",
			srcPath + "templates/helpers/helper-syntax.js",
			srcPath + "templates/helpers/helper-xif.js",
			srcPath + "templates/layouts/tpl-default.hbs",
			srcPath + "templates/pages/index.hbs",
			srcPath + "templates/partials/_global/_scripts.hbs",
			srcPath + "templates/partials/_global/_metadata.hbs",
			srcPath + "templates/partials/_global/_styles.hbs"
		];
		helpers.assertFiles(expected);

	});

	it('adds task to watch.js file', function () {
		helpers.assertFile(helperPath + "_grunt/watch.js", /templates/);
	});

	it('adds task to Gruntfile.js file', function () {
		helpers.assertFile("Gruntfile.js", /assemble/);
	});
})
;