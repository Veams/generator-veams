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
var jsTestAndQAId = 'testandqa';

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
			},
			{
				name: 'JS Testing and Code Quality Tools',
				value: jsTestAndQAId,
				checked: true
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