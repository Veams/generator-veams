/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');

describe('Veams Framework', function () {
	const helperPath = 'configs/';
	const srcPath = 'src/';

	describe('when it is installed', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({
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
				srcPath + 'shared/layouts/README.md',
				srcPath + 'shared/components/README.md',
				srcPath + 'shared/utilities/README.md'
			];
			assert.file(expected);
		});

		it('package.json contains reference', function () {
			assert.fileContent('package.json', /veams/);
			assert.fileContent('package.json', /veams-plugin/);
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
			assert.fileContent('configs/config.js', /'shared\/scripts\/events.js'/);
		});

		it('adds app.js, main.js and events.js to specific folders', function () {
			assert.file([
				srcPath + 'core/app/scripts/app.js',
				srcPath + 'shared/scripts/events.js',
				srcPath + 'core/app/scripts/main.js'
			]);
		});

		it('adds references to app.js, main.js in js folder', function () {
			assert.fileContent(srcPath + 'core/app/scripts/app.js', /import Veams from/);
			assert.fileContent(srcPath + 'core/app/scripts/main.js', /import \{App, Veams\} from/);
		});

		it('adds _get-media.scss and import state to sass file', function () {
			assert.file(srcPath + 'shared/styles/global/_get-media.scss');
			assert.fileContent(srcPath + 'core/app/styles/main.scss', /@import \"..\/..\/shared\/styles\/global\/_get-media\"/);
		});

	});

});