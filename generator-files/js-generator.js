var _ = require('lodash');
var jqueryId = 'jquery';
var backboneId = 'backbone';
var underscoreId = 'underscore';
var exoskeletonId = 'exoskeleton';
var ampersandId = 'ampersand';
var documentRegisterElementId = 'document-register-element';
var handlebarsId = 'handlebars';
var respimageId = 'respimage';
var touchswipeId = 'touchswipe';

var pgJSPreset = [
	backboneId,
	underscoreId,
	exoskeletonId,
	documentRegisterElementId,
	handlebarsId,
	respimageId,
	touchswipeId
];

exports.questions = function () {
	return {
		name: 'jsLibs',
		type: 'checkbox',
		message: 'Do you want to use any JS Libraries?',
		choices: [
			{
				name: 'jQuery (latest Version)',
				value: jqueryId,
				checked: true
			},
			{
				name: 'BackboneJS',
				value: backboneId,
				checked: false
			},
			{
				name: 'Exoskeleton',
				value: exoskeletonId,
				checked: true
			},
			{
				name: 'Ampersand (can only be used with CommonJS)',
				value: ampersandId,
				checked: false
			},
			{
				name: 'document-register-element',
				value: documentRegisterElementId,
				checked: false
			}
		],

		default: this.config.get('jsLibs')
	};
};

exports.setup = function () {
	this.jsLibs = this.config.get('jsLibs') || [];
	if (this.config.get('pgPackages') && this.config.get('pgPackages').indexOf('pgJS') !== -1) {
		// merge array and remove duplicates
		this.jsLibs = _.union(this.config.get('jsLibs'), pgJSPreset);
	}
};

exports.scaffold = function () {
	// Bower handling
	if (this.gruntModules.indexOf('grunt-browserify') !== -1 ||
		this.gulpModules.indexOf('browserify') !== -1 ||
		this.taskRunner.indexOf('gulp') !== -1 && this.gulpModules.indexOf('gulp-requirejs-optimize') === -1 ||
		this.taskRunner.indexOf('grunt') !== -1 && this.gruntModules.indexOf('grunt-contrib-requirejs') === -1) {
		delete this.bowerFile['dependencies']['almond'];
		delete this.bowerFile['dependencies']['requirejs'];
		delete this.bowerFile['dependencies']['requirejs-text'];
	}

	if (this.jsLibs.indexOf(backboneId) == -1 ||
		this.gruntModules.indexOf('grunt-browserify') !== -1 ||
		this.gulpModules.indexOf('browserify') !== -1) delete this.bowerFile['dependencies']['backbone'];

	if (this.jsLibs.indexOf(jqueryId) == -1 ||
		this.gruntModules.indexOf('grunt-browserify') !== -1 ||
		this.gulpModules.indexOf('browserify') !== -1) delete this.bowerFile['dependencies']['jquery'];

	if (this.pgPackages.indexOf('pgJS') == -1) delete this.bowerFile['dependencies']['pg-js'];

	// Add JS files for libraries
	if (this.gruntModules.indexOf('grunt-contrib-requirejs') != -1 || this.gulpModules.indexOf('gulp-requirejs-optimize') != -1) {
		this.template('resources/js/_main.require.js.ejs', 'resources/js/main.js');
		this.template('resources/js/_app.require.js.ejs', 'resources/js/app.js');
	} else if (this.gruntModules.indexOf('grunt-browserify') !== -1 || this.gulpModules.indexOf('browserify') !== -1) {
		this.template('resources/js/_main.browserify.js.ejs', 'resources/js/main.js');
		this.template('resources/js/_app.browserify.js.ejs', 'resources/js/app.js');
	}
};