var _ = require('lodash');
var foundationId = 'foundation';
var neatId = 'neat';
var bootstrapId = 'bootstrap-sass';
var lostGridId = 'lost-grid';
var includeMediaId = 'include-media';
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
				name: 'Bourbon Neat (Beta)',
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
	if (this.cssLibs.indexOf(foundationId) == -1) delete this.bowerFile['dependencies']['foundation'];
	if (this.cssLibs.indexOf(includeMediaId) == -1) delete this.bowerFile['dependencies']['include-media'];
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

	// Grunt handling
	if (this.cssLibs.indexOf(lostGridId) != -1) {
		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.copy(this.generatorGruntPath + 'postcss.js.ejs', this.gruntPath + 'postcss.js');
			delete this.pkgFile['devDependencies']['gulp-postcss'];
		} else {
			delete this.pkgFile['devDependencies']['grunt-postcss'];
		}
	} else {
		delete this.pkgFile['devDependencies']['lost'];
	}
};