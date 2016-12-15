/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');

describe('bower', function () {
	describe('when no frameworks are selected', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({});

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
			assert.noFileContent('bower.json', /veams-components|veams-scss|veams-query|veams-js|almond|include-media|requirejs|requirejs-text|underscore|backbone|jquery|foundation|sass-bootstrap|bourbon|neat/);
		});

	});

});