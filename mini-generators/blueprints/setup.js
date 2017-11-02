const path = require('path');
const helpers = require('../../lib/helpers');
const config = require('../../lib/config');
const configFile = helpers.getProjectConfig();

module.exports = function setup() {
	let checkConfig = function (type) {
		return configFile &&
			configFile &&
			configFile &&
			configFile.blueprints &&
			configFile.blueprints[type]
	};

	this.rootFolderPath = this.path + '/' + this.filename + '/';
};