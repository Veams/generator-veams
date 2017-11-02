const config = require('./config');

module.exports = function scaffold() {
	if (this.jsLibs.indexOf(config.reactId) == -1) {
		delete this.pkgFile['dependencies'][config.reactId];
	}

	if (this.jsLibs.indexOf(config.jqueryId) == -1) {
		delete this.pkgFile['dependencies'][config.jqueryId];
	}

	if (this.jsLibs.indexOf(config.veamsQueryId) == -1) {
		delete this.pkgFile['dependencies'][config.veamsQueryId];
	}
};