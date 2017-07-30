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
	const srcPath = "src/";
	const helperPath = "configs/";

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
			srcPath + "store/config.json",
			srcPath + "shared/utilities/template-helpers/alias.js",
			srcPath + "shared/utilities/template-helpers/helper-wrapWith.js",
			srcPath + "shared/utilities/template-helpers/helper-ifBlock.js",
			srcPath + "shared/layouts/lyt-default.hbs",
			srcPath + "containers/pages/index/index.hbs",
			srcPath + "shared/components/globals/_scripts.hbs",
			srcPath + "shared/components/globals/_metadata.hbs",
			srcPath + "shared/components/globals/_styles.hbs"
		];
		assert.file(expected);

	});

	it('adds paths to config.js', function () {
		assert.fileContent(helperPath + "config.js", /'containers\/pages'/);
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