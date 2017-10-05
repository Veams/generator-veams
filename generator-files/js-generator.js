'use strict';

const _ = require('lodash');
const veamsQueryId = 'veams-query';
const jqueryId = 'jquery';
const reactId = 'react';
const preactId = 'preact';
const handlebarsId = 'handlebars';
const picturefillId = 'picturefill';
const lazysizesId = 'lazysizes';
const veamsJSPreset = [
	handlebarsId,
	picturefillId,
	lazysizesId
];

exports.questions = function () {
	return {
		name: 'jsLibs',
		type: 'checkbox',
		message: 'Do you want to use any JS Libraries?',
		choices: [
			{
				name: 'Veams-Query',
				value: veamsQueryId,
				checked: false
			},
			{
				name: 'jQuery (latest Version)',
				value: jqueryId,
				checked: false
			},
			{
				name: 'React',
				value: reactId,
				checked: false
			},
			{
				name: 'Preact',
				value: preactId,
				checked: false
			}
		],
		validate: function (answer) {
			let done = this.async();

			if (answer.indexOf(reactId) != -1 && answer.indexOf(preactId) != -1) {

				done("Please choose only one of the two.", false);
			}

			done(null, true);
		},
		default: this.config.get('jsLibs')
	};
};

exports.setup = function () {
	this.jsLibs = this.config.get('jsLibs') || [];
	if (this.config.get('veamsPackages')) {
		// merge array and remove duplicates
		this.jsLibs = _.union(this.config.get('jsLibs'), veamsJSPreset);
	}
};

exports.scaffold = function () {
	if (this.jsLibs.indexOf(preactId) == -1) {
		delete this.pkgFile['dependencies']['preact'];
	}

	if (this.jsLibs.indexOf(reactId) == -1) {
		delete this.pkgFile['dependencies']['react'];
	}

	if (this.jsLibs.indexOf(jqueryId) == -1) {
		delete this.pkgFile['dependencies']['jquery'];
	}

	if (this.jsLibs.indexOf(veamsQueryId) == -1) {
		delete this.pkgFile['dependencies']['veams-query'];
	}

	// Add JS files for libraries
	if (this.gruntModules.indexOf('grunt-browserify') !== -1) {
		this.fs.copyTpl(
			this.templatePath('src/core/app/scripts/_main.browserify.js.ejs'),
			'src/core/app/scripts/main.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath('src/core/app/scripts/_app.browserify.js.ejs'),
			'src/core/app/scripts/app.js',
			this
		);
	}
};