var _ = require('lodash');
var jqueryId = 'jquery';
var backboneId = 'backbone';
var underscoreId = 'underscore';
var exoskeletonId = 'exoskeleton';
var ampersandId = 'ampersand';
var documentRegisterElementId = 'document-register-element';
var handlebarsId = 'handlebars';
var respimageId = 'respimage';
var touchswipeId = 'jquery-touchswipe';

var veamsJSPreset = [
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
		validate: function (answer) {
			var done = this.async();

			if ((answer.indexOf(backboneId) != -1 && answer.indexOf(exoskeletonId) != -1) ||
				(answer.indexOf(backboneId) != -1 && answer.indexOf(ampersandId) != -1) ||
				(answer.indexOf(exoskeletonId) != -1 && answer.indexOf(ampersandId) != -1)) {

				done("Please choose only one of the MV frameworks.");
				return;
			}

			done(true);
		},
		default: this.config.get('jsLibs')
	};
};

exports.setup = function () {
	this.jsLibs = this.config.get('jsLibs') || [];
	if (this.config.get('veamsPackages') && this.config.get('veamsPackages').indexOf('veamsJS') !== -1) {
		// merge array and remove duplicates
		this.jsLibs = _.union(this.config.get('jsLibs'), veamsJSPreset);
	}
};

exports.scaffold = function () {
	if (this.jsLibs.indexOf(backboneId) == -1 ||
		this.gruntModules.indexOf('grunt-browserify') !== -1 ||
		this.gulpModules.indexOf('browserify') !== -1) delete this.bowerFile['dependencies']['backbone'];

	if (this.jsLibs.indexOf(exoskeletonId) == -1 ||
		this.gruntModules.indexOf('grunt-browserify') !== -1 ||
		this.gulpModules.indexOf('browserify') !== -1) delete this.bowerFile['dependencies']['exoskeleton'];

	if (this.jsLibs.indexOf(jqueryId) == -1 ||
		this.gruntModules.indexOf('grunt-browserify') !== -1 ||
		this.gulpModules.indexOf('browserify') !== -1) delete this.bowerFile['dependencies']['jquery'];

	if (this.veamsPackages.indexOf('veamsJS') === -1) delete this.bowerFile['dependencies']['veams-js'];

	// Add JS files for libraries
	if (this.gruntModules.indexOf('grunt-contrib-requirejs') != -1 || this.gulpModules.indexOf('gulp-requirejs-optimize') != -1) {
		this.template('resources/js/_main.require.js.ejs', 'resources/js/main.js');
		this.template('resources/js/_app.require.js.ejs', 'resources/js/app.js');
	} else if (this.gruntModules.indexOf('grunt-browserify') !== -1 || this.gulpModules.indexOf('browserify') !== -1) {
		this.template('resources/js/_main.browserify.js.ejs', 'resources/js/main.js');
		this.template('resources/js/_app.browserify.js.ejs', 'resources/js/app.js');
	} else if (this.gruntModules.indexOf('grunt-includes') !== -1) {
		this.template('resources/js/_main.includes.js.ejs', 'resources/js/main.js');
		this.template('resources/js/_app.includes.js.ejs', 'resources/js/app.js');
	}
};