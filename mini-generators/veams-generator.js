'use strict';

exports.setup = function () {
	this.veamsPackages = this.config.get('veamsPackages') || true;
};

exports.overwriteSetup = function () {
	if (this.taskRunner === 'grunt') {
		let gruntModules = this.config.get('gruntModules');

		if (this.projectType === 'static-page-app') {
			gruntModules.push('grunt-contrib-handlebars');
		}

		this.config.set('gruntModules', gruntModules);
	}
};

exports.scaffold = function () {
	this.fs.copyTpl(
		this.templatePath('src/app/_app.veams.js.ejs'),
		this.destinationPath('src/app/app.veams.js'),
		this
	);

	this.fs.copy(
		this.templatePath('src/app/app.events.js'),
		this.destinationPath('src/app/app.events.js')
	);

	// Components
	this.fs.copy(
		this.templatePath('src/app/shared/components/README.md'),
		this.destinationPath('src/app/shared/components/README.md')
	);

	// Utilities
	this.fs.copy(
		this.templatePath('src/app/shared/utilities/README.md'),
		this.destinationPath('src/app/shared/utilities/README.md')
	);


	if (this.projectType === 'single-page-app') {
		delete this.pkgFile[ 'dependencies' ][ '@veams/component' ];
		delete this.pkgFile[ 'dependencies' ][ '@veams/plugin-dom' ];
		delete this.pkgFile[ 'dependencies' ][ '@veams/plugin-modules' ];
		delete this.pkgFile[ 'dependencies' ][ '@veams/plugin-store' ];
		delete this.pkgFile[ 'dependencies' ][ '@veams/plugin-templater' ];
		delete this.pkgFile[ 'dependencies' ][ '@veams/plugin-mixins' ];
	}
};
