/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');
//
//describe('Blueprints generator', function () {
//
//	describe('when name is slider', function () {
//		var answers = {
//			bpName: 'slider',
//			bpWithWrapWith: false,
//			bpWithJs: true,
//			bpType: 'c-'
//		};
//
//		beforeEach(function (done) {
//			helpers.run(path.join(__dirname, '../generators/blueprint'))
//				.inDir(path.join(__dirname, 'tmp'))
//				.withOptions({
//					'tmp': true,
//					'skip-install': true,
//					'skip-welcome-message': true
//				})
//				.withPrompts(answers)
//				.on('end', done);
//		});
//
//		it('creates files', function () {
//			var expected = [
//				answer.bpName + '/README.md',
//				answer.bpName + '/data/' + answer.bpName + '-bp.json',
//				answer.bpName + '/partial/c-' + answer.bpName + '.hbs',
//				answer.bpName + '/scss/_c-' + answer.bpName + '.scss',
//				answer.bpName + '/js/' + answer.bpName + '.js'
//			];
//			assert.file(expected);
//		});
//
//	});
//});