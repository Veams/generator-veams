'use strict';

exports.setup = function () {
	this.veamsPackages = this.config.get('veamsPackages') || true;
};

exports.overwriteSetup = function () {
	if (this.taskRunner.indexOf('grunt') !== -1) {
		let gruntModules = this.config.get('gruntModules');

		gruntModules.push('grunt-browserify');
		gruntModules.push('grunt-contrib-uglify');

		if (this.projectType === 'static-page-app') {
			gruntModules.push('grunt-contrib-handlebars');
		}

		this.config.set('gruntModules', gruntModules);
	}
};

exports.scaffold = function () {
	// delete this.pkgFile['dependencies']['veams'];
	// delete this.pkgFile['dependencies']['veams-plugin-logger'];
	// delete this.pkgFile['dependencies']['veams-plugin-media-query-handler'];
	// delete this.pkgFile['dependencies']['veams-plugin-vent'];
	this.fs.copy(
		this.templatePath('src/app.events.js'),
		'src/app.events.js'
	);

	this.fs.copy(
		this.templatePath('src/core/styles/_get-media.scss'),
		'src/core/styles/_get-media.scss'
	);

	// Components
	this.fs.copy(
		this.templatePath('src/shared/components/README.md'),
		'src/shared/components/README.md'
	);

	// Utilities
	this.fs.copy(
		this.templatePath('src/shared/utilities/README.md'),
		'src/shared/utilities/README.md'
	);


	if (this.projectType === 'single-page-app') {
		delete this.pkgFile['dependencies']['veams-plugin-dom'];
		delete this.pkgFile['dependencies']['veams-plugin-modules'];
		delete this.pkgFile['dependencies']['veams-plugin-store'];
		delete this.pkgFile['dependencies']['veams-plugin-templater'];
		delete this.pkgFile['dependencies']['veams-plugin-mixins'];
	}
};