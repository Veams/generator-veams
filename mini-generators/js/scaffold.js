const config = require('./config');

module.exports = function scaffold() {
	if (this.jsLibs.indexOf(config.reactId) == -1) {
		delete this.pkgFile['dependencies'][config.reactId];
		delete this.pkgFile['devDependencies']['babel-preset-react'];
	}
	if (this.jsLibs.indexOf(config.jqueryId) == -1) delete this.pkgFile['dependencies'][config.jqueryId];
	if (this.jsLibs.indexOf(config.veamsQueryId) == -1) delete this.pkgFile['dependencies'][config.veamsQueryId];
	if (this.jsLibs.indexOf(config.handlebarsId) == -1) delete this.pkgFile['dependencies'][config.handlebarsId];
	if (this.jsLibs.indexOf(config.rxjsId) == -1) delete this.pkgFile['dependencies'][config.rxjsId];

	if (this.jsLibs.indexOf(config.reduxId) !== -1) {
		this.fs.copy(
			this.templatePath('src/app.store.js'),
			'src/app.store.js'
		);
	} else {
		delete this.pkgFile['dependencies'][config.reduxId];
		delete this.pkgFile['dependencies']['react-redux'];
	}
};