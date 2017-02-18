'use strict';

const _ = require('lodash');
const veamsQueryId = 'veams-query';
const jqueryId = 'jquery';
const backboneId = 'backbone';
const exoskeletonId = 'exoskeleton';
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
				name: 'BackboneJS',
				value: backboneId,
				checked: false
			},
			{
				name: 'Exoskeleton',
				value: exoskeletonId,
				checked: false
			}
		],
		validate: function (answer) {
			let done = this.async();

			if (answer.indexOf(backboneId) != -1 && answer.indexOf(exoskeletonId) != -1) {

				done("Please choose only one of the MV frameworks.", false);
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
	if (this.jsLibs.indexOf(backboneId) == -1) {
		delete this.bowerFile['dependencies']['backbone'];
		delete this.pkgFile['dependencies']['backbone'];
		delete this.bowerFile['dependencies']['underscore'];
		delete this.pkgFile['dependencies']['underscore'];
	}

	if (this.jsLibs.indexOf(exoskeletonId) == -1) {
		delete this.bowerFile['dependencies']['exoskeleton'];
		delete this.pkgFile['dependencies']['exoskeleton'];
		delete this.pkgFile['dependencies']['backbone.nativeview'];
		delete this.pkgFile['dependencies']['backbone.nativeajax'];
	}

	if (this.jsLibs.indexOf(jqueryId) == -1) {
		delete this.bowerFile['dependencies']['jquery'];
		delete this.pkgFile['dependencies']['jquery'];
	}

	if (this.jsLibs.indexOf(veamsQueryId) == -1) {
		delete this.bowerFile['dependencies']['veams-query'];
		delete this.pkgFile['dependencies']['veams-query'];
	}

	// Add JS files for libraries
	if (this.gruntModules.indexOf('grunt-contrib-requirejs') != -1 || this.gulpModules.indexOf('gulp-requirejs-optimize') != -1) {
		this.fs.copyTpl(
			this.templatePath('resources/js/_main.require.js.ejs'),
			'resources/js/main.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath('resources/js/_app.require.js.ejs'),
			'resources/js/app.js',
			this
		);
	} else if (this.gruntModules.indexOf('grunt-browserify') !== -1 || this.gulpModules.indexOf('browserify') !== -1) {
		this.fs.copyTpl(
			this.templatePath('resources/js/_main.browserify.js.ejs'),
			'resources/js/main.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath('resources/js/_app.browserify.js.ejs'),
			'resources/js/app.js',
			this
		);
	} else if (this.gruntModules.indexOf('grunt-includes') !== -1) {
		this.fs.copyTpl(
			this.templatePath('resources/js/_main.includes.js.ejs'),
			'resources/js/main.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath('resources/js/_app.includes.js.ejs'),
			'resources/js/app.js',
			this
		);
	}
};