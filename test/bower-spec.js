/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');

describe('bower', function () {
	describe('when no frameworks are selected', function () {
		const answers = require('../test_helpers/prompt-answer-factory')({});

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

		it('delete all bower dependenies', function () {
			assert.noFileContent('bower.json', /veams-query|almond|include-media|requirejs|requirejs-text|underscore|backbone|jquery|foundation|sass-bootstrap|bourbon|neat/);
		});

	});

});