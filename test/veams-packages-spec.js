/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');

describe('Veams Framework', function () {
	const helperPath = 'helpers/';
	const srcPath = 'resources/';

	describe('when it is installed', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
			'templateEngine': 'assemble',
			'veamsPackages': true
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

		it('creates READMEs', function () {
			const expected = [
				srcPath + 'templating/layouts/README.md',
				srcPath + 'templating/partials/blocks/README.md',
				srcPath + 'templating/partials/components/README.md',
				srcPath + 'templating/partials/utilities/README.md'
			];
			assert.file(expected);
		});

		it('package.json contains reference', function () {
			assert.fileContent('package.json', /veams/);
		});

		it('adds references to dependencies in package.json', function () {
			assert.fileContent('package.json', /grunt-browserify/);
			assert.fileContent('package.json', /grunt-contrib-handlebars/);
		});

		it('creates helper files', function () {
			assert.file(helperPath + '_grunt/browserify.js');
			assert.file(helperPath + '_grunt/handlebars.js');
		});

		it('adds task to Gruntfile.js file', function () {
			assert.fileContent('Gruntfile.js', /'browserify\:dev'/);
			assert.fileContent('Gruntfile.js', /'browserify\:vendor'/);
			assert.fileContent('Gruntfile.js', /'browserify\:dist'/);
			assert.fileContent('Gruntfile.js', /handlebars/);
		});

		it('adds event endpoint to config.js file', function () {
			assert.fileContent('helpers/config.js', /'resources\/js\/events.js'/);
		});

		it('adds app.js, main.js and config.js to js folder', function () {
			assert.file([
				srcPath + 'js/app.js',
				srcPath + 'js/events.js',
				srcPath + 'js/main.js'
			]);
		});

		it('adds references to app.js, main.js in js folder', function () {
			assert.fileContent(srcPath + 'js/app.js', /import Veams from/);
			assert.fileContent(srcPath + 'js/main.js', /import \{App, Veams\} from/);
		});

		it('adds _get-media.scss and import state to sass file', function () {
			assert.file(srcPath + 'scss/global/_get-media.scss');
			assert.fileContent(srcPath + 'scss/styles.scss', /@import \"global\/_get-media\"/);
		});

	});

});