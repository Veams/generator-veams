var _ = require('lodash');
var foundationId = 'foundation';
var neatId = 'neat';
var bootstrapId = 'sass-bootstrap';
var pgSCSSId = 'pgSCSS';

var pgSCSSPreset = [
	pgSCSSId
];

exports.questions = function () {
	return {
		name: 'cssLibs',
		type: 'checkbox',
		message: 'Do you want to use any CSS Frameworks?',
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
	if (this.cssLibs.indexOf(bootstrapId) == -1) delete this.bowerFile['dependencies']['sass-bootstrap'];
	if (this.cssLibs.indexOf(neatId) == -1) {
		delete this.bowerFile['dependencies']['bourbon'];
		delete this.bowerFile['dependencies']['neat'];
	}

	if (this.config.get('pgPackages') && this.config.get('pgPackages').indexOf(pgSCSSId) !== -1) {
		// merge array and remove duplicates
		this.cssLibs = _.union(this.config.get('cssLibs'), pgSCSSPreset);
	}

	// Bower handling
	if (this.config.get('pgPackages').indexOf(pgSCSSId) === -1) delete this.bowerFile['dependencies']['pg-scss'];
};