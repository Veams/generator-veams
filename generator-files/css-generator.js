var _ = require('lodash');
var foundationId = 'foundation';
var neatId = 'neat';
var bootstrapId = 'bootstrap-sass';
var veamsSCSSId = 'veamsSCSS';

var veamsSCSSPreset = [
	veamsSCSSId
];

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
	if (this.cssLibs.indexOf(foundationId) == -1) delete this.bowerFile['dependencies']['foundation'];
	if (this.cssLibs.indexOf(bootstrapId) == -1) delete this.bowerFile['dependencies']['bootstrap-sass'];
	if (this.cssLibs.indexOf(neatId) == -1) {
		delete this.bowerFile['dependencies']['bourbon'];
		delete this.bowerFile['dependencies']['neat'];
	}

	if (this.config.get('veamsPackages') && this.config.get('veamsPackages').indexOf(veamsSCSSId) !== -1) {
		// merge array and remove duplicates
		this.cssLibs = _.union(this.config.get('cssLibs'), veamsSCSSPreset);
	}

	// Bower handling
	if (this.config.get('veamsPackages').indexOf(veamsSCSSId) === -1) delete this.bowerFile['dependencies']['veams-scss'];
};