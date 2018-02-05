'use strict';

const config = require('./config');

module.exports = function scaffold() {
	if (this.jsLibs.indexOf(config.reactId) === -1) {
		delete this.pkgFile['dependencies'][config.reactId];
		delete this.pkgFile['dependencies']['history'];
		delete this.pkgFile['dependencies']['react-dom'];
		delete this.pkgFile['dependencies']['react-router-dom'];
		delete this.pkgFile['dependencies']['react-router-config'];
		delete this.pkgFile['devDependencies']['babel-preset-react'];
		delete this.pkgFile['devDependencies']['veams-bp-react-container'];

		/**
		 * Blueprints
		 */
		delete this.veamsFile['blueprints']['container'];
	}
	if (this.jsLibs.indexOf(config.jqueryId) === -1) delete this.pkgFile['dependencies'][config.jqueryId];
	if (this.jsLibs.indexOf(config.veamsQueryId) === -1) delete this.pkgFile['dependencies'][config.veamsQueryId];
	if (this.jsLibs.indexOf(config.handlebarsId) === -1) delete this.pkgFile['dependencies'][config.handlebarsId];
	if (this.jsLibs.indexOf(config.rxjsId) === -1) delete this.pkgFile['dependencies'][config.rxjsId];

	if (this.jsLibs.indexOf(config.reduxId) !== -1) {
		this.fs.copy(
			this.templatePath('src/app/app.store.js'),
			'src/app/app.store.js'
		);

		if (this.projectType === 'static-page-app') {
			delete this.pkgFile['dependencies']['react-redux'];
			delete this.pkgFile['dependencies']['react-router-redux'];
		}
	} else {
		delete this.pkgFile['dependencies'][config.reduxId];
		delete this.pkgFile['dependencies']['react-redux'];
		delete this.pkgFile['dependencies']['react-router-redux'];
		delete this.pkgFile['dependencies']['redux-devtools-extension'];
		delete this.pkgFile['dependencies']['redux-immutable-state-invariant'];
		delete this.pkgFile['dependencies']['redux-observable'];
		delete this.pkgFile['dependencies']['reselect'];
		delete this.pkgFile['devDependencies']['veams-bp-redux'];

		/**
		 * Blueprints
		 */
		delete this.veamsFile['blueprints']['store'];
	}
};