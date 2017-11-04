const _ = require('lodash');
const config = require('./config');

module.exports = function setup() {
	this.jsLibs = this.config.get('jsLibs') || [];

	// merge array and remove duplicates
	this.jsLibs = _.union(this.config.get('jsLibs'), config.veamsJSPreset);

	if (this.projectType === 'single-page-app') {
		this.jsLibs.push(config.reactId);
	}
};
