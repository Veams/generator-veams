/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');
const answers = require('../test_helpers/prompt-answer-factory')({
	"templateEngine": "assemble"
});


describe('assemble', function () {
	const srcPath = "resources/";
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
		assert.fileContent('package.json', /assemble/);

	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/assemble.js");
	});

	it('creates resources files', function () {
		const expected = [
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
		assert.file(expected);

	});

	it('adds paths to config.js', function () {
		assert.fileContent(helperPath + "config.js", /'resources\/templating\/pages'/);
		assert.fileContent(helperPath + "config.js", /partials/);
	});

	it('adds task to chokidar.js file', function () {
		assert.fileContent(helperPath + "_grunt/chokidar.js", /templating/);
	});
	
	
	it('adds references to package.json', function () {
		assert.fileContent('package.json', /mangony-hbs-helpers/);
		assert.noFileContent('package.json', /grunt-mangony/);
	});

	it('adds task to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /assemble/);
	});
})
;