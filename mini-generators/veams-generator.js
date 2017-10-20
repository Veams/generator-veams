'use strict';

exports.setup = function () {
	this.veamsPackages = this.config.get('veamsPackages') || true;
};

exports.overwriteSetup = function () {
	if (this.taskRunner.indexOf('grunt') !== -1) {
		let gruntModules = this.config.get('gruntModules');

		gruntModules.push('grunt-contrib-handlebars');
		gruntModules.push('grunt-browserify');
		gruntModules.push('grunt-contrib-uglify');

		this.config.set('gruntModules', gruntModules);
	}
};

exports.scaffold = function () {
	// delete this.pkgFile['dependencies']['veams'];
	// delete this.pkgFile['dependencies']['veams-plugin-logger'];
	// delete this.pkgFile['dependencies']['veams-plugin-media-query-handler'];
	// delete this.pkgFile['dependencies']['veams-plugin-mixins'];
	// delete this.pkgFile['dependencies']['veams-plugin-vent'];

	if (this.projectType === 'single-page-app') {
		delete this.pkgFile['dependencies']['veams-plugin-dom'];
		delete this.pkgFile['dependencies']['veams-plugin-modules'];
		delete this.pkgFile['dependencies']['veams-plugin-store'];
		delete this.pkgFile['dependencies']['veams-plugin-templater'];
	}

	this.fs.copy(
		this.templatePath('src/shared/scripts/events.js'),
		'src/shared/scripts/events.js'
	);
	this.fs.copy(
		this.templatePath('src/core/styles/_get-media.scss'),
		'src/core/styles/_get-media.scss'
	);

	// Layouts
	this.fs.copy(
		this.templatePath('src/core/layouts/README.md'),
		'src/core/layouts/README.md'
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
};