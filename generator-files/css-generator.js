'use strict';

const _ = require('lodash');
const foundationId = 'foundation-sites';
const neatId = 'bourbon-neat';
const bootstrapId = 'bootstrap-sass';
const lostGridId = 'lost-grid';
const includeMediaId = 'include-media';

exports.questions = function () {
	return {
		name: 'cssLibs',
		type: 'checkbox',
		message: 'Do you want to use any Sass Frameworks?',
		choices: [
			{
				name: 'Foundation',
				value: foundationId,
				checked: false
			},
			{
				name: 'Bourbon Neat',
				value: neatId,
				checked: false
			},
			{
				name: 'SASS Bootstrap',
				value: bootstrapId,
				checked: false
			},
			{
				name: 'Lost Grid (PostCSS)',
				value: lostGridId,
				checked: false
			},
			{
				name: 'Include Media',
				value: includeMediaId,
				checked: true
			}
		],
		default: this.config.get('cssLibs')
	};
};

exports.setup = function () {
	this.cssLibs = this.config.get('cssLibs') || [];
};

exports.scaffold = function () {
	// Delete CSS packages
	if (this.cssLibs.indexOf(foundationId) == -1) delete this.pkgFile['dependencies']['foundation-sites'];
	if (this.cssLibs.indexOf(includeMediaId) == -1) delete this.pkgFile['dependencies']['include-media'];
	if (this.cssLibs.indexOf(bootstrapId) == -1) delete this.pkgFile['dependencies']['bootstrap-sass'];
	if (this.cssLibs.indexOf(neatId) == -1) {
		delete this.pkgFile['dependencies']['bourbon-neat'];
		delete this.pkgFile['dependencies']['neat'];
	}

	// Grunt handling
	if (this.cssLibs.indexOf(lostGridId) != -1) {
		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.fs.copyTpl(
				this.templatePath(this.generatorGruntPath + 'postcss.js.ejs'),
				this.gruntPath + 'postcss.js',
				this
			);
		} else {
			delete this.pkgFile['devDependencies']['grunt-postcss'];
		}
	} else {
		delete this.pkgFile['devDependencies']['lost'];
	}
};