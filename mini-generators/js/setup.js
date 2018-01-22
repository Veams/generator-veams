const _ = require('lodash');
const config = require('./config');

module.exports = function setup() {
	this.jsLibs = this.config.get('jsLibs') || [];

	if (this.projectType === 'single-page-app') {
		this.jsLibs.push(config.reactId);
	}
};
