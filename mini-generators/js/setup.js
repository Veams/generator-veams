const _ = require('lodash');
const config = require('./config');

module.exports = function setup() {
	this.jsLibs = this.config.get('jsLibs') || [];
	if (this.config.get('veamsPackages')) {
		if (this.config.get('projectType') === 'static-page-app') {
			this.jsLibs.push(config.handlebarsId);
		}
		// merge array and remove duplicates
		this.jsLibs = _.union(this.config.get('jsLibs'), config.veamsJSPreset);
	}
};
