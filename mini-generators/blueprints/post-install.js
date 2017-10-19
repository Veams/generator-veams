const helpers = require('../../lib/helpers');

module.exports = function postInstall() {
	helpers.deleteSettingsFile();
};