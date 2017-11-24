'use strict';

exports.setup = function () {
	this.veamsPackages = this.config.get('veamsPackages') || true;
};

exports.overwriteSetup = function () {
	if (this.taskRunner === 'grunt') {
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
	this.fs.copyTpl(
		this.templatePath('src/app/_app.veams.js.ejs'),
		'src/app/app.veams.js',
		this
	);

	this.fs.copy(
		this.templatePath('src/app/app.events.js'),
		'src/app/app.events.js'
	);

	this.fs.copy(
		this.templatePath('src/app/core/styles/_get-media.scss'),
		'src/app/core/styles/_get-media.scss'
	);

	// Components
	this.fs.copy(
		this.templatePath('src/app/shared/components/README.md'),
		'src/app/shared/components/README.md'
	);

	// Utilities
	this.fs.copy(
		this.templatePath('src/app/shared/utilities/README.md'),
		'src/app/shared/utilities/README.md'
	);


	if (this.projectType === 'single-page-app') {
		delete this.pkgFile['dependencies']['veams-plugin-dom'];
		delete this.pkgFile['dependencies']['veams-plugin-modules'];
		delete this.pkgFile['dependencies']['veams-plugin-store'];
		delete this.pkgFile['dependencies']['veams-plugin-templater'];
		delete this.pkgFile['dependencies']['veams-plugin-mixins'];
	}
};