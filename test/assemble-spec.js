/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
	"templateEngine": "assemble"
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
			srcPath + "templating/data/config.json",
			srcPath + "templating/helpers/alias.js",
			srcPath + "templating/helpers/helper-wrapWith.js",
			srcPath + "templating/helpers/helper-ifBlock.js",
			srcPath + "templating/layouts/lyt-default.hbs",
			srcPath + "templating/pages/index.hbs",
			srcPath + "templating/partials/_global/_scripts.hbs",
			srcPath + "templating/partials/_global/_metadata.hbs",
			srcPath + "templating/partials/_global/_styles.hbs"
		];
		helpers.assertFiles(expected);

	});

	it('adds paths to config.js', function () {
		helpers.assertFile(helperPath + "config.js", /'resources\/templating\/pages'/);
		helpers.assertFile(helperPath + "config.js", /partials/);
	});

	it('adds task to watch.js file', function () {
		helpers.assertFile(helperPath + "_grunt/watch.js", /templating/);
	});
	
	
	it('adds references to package.json', function () {
		assert.fileContent('package.json', /mangony-hbs-helpers/);
		assert.noFileContent('package.json', /grunt-mangony/);
	});

	it('adds task to Gruntfile.js file', function () {
		helpers.assertFile("Gruntfile.js", /assemble/);
	});
})
;