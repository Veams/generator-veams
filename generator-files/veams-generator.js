'use strict';

exports.questions = function () {
	return {
		name: 'veamsPackages',
		type: 'confirm',
		message: 'Do you want to use the Veams framework?',
		default: true
	};
};

exports.setup = function () {
	this.veamsPackages = this.config.get('veamsPackages') || false;
};

exports.overwriteSetup = function () {
	if (this.veamsPackages) {
		if (this.taskRunner.indexOf('grunt') !== -1) {
			let gruntModules = this.config.get('gruntModules');

			gruntModules.push('grunt-contrib-handlebars');
			gruntModules.push('grunt-browserify');
			gruntModules.push('grunt-contrib-uglify');

			this.config.set('gruntModules', gruntModules);
		}
	}
};

exports.scaffold = function () {
	if (!this.veamsPackages) {
		delete this.pkgFile['dependencies']['veams'];
		delete this.pkgFile['dependencies']['veams-plugin-dom'];
		delete this.pkgFile['dependencies']['veams-plugin-logger'];
		delete this.pkgFile['dependencies']['veams-plugin-media-query-handler'];
		delete this.pkgFile['dependencies']['veams-plugin-mixins'];
		delete this.pkgFile['dependencies']['veams-plugin-modules'];
		delete this.pkgFile['dependencies']['veams-plugin-store'];
		delete this.pkgFile['dependencies']['veams-plugin-templater'];
		delete this.pkgFile['dependencies']['veams-plugin-vent'];

		return;
	}

	if (this.veamsPackages) {
		this.fs.copy(
			this.templatePath('src/shared/scripts/events.js'),
			'src/shared/scripts/events.js'
		);
		this.fs.copy(
			this.templatePath('src/shared/styles/global/_get-media.scss'),
			'src/shared/styles/global/_get-media.scss'
		);

		if (this.templateEngine !== '') {
			// Layouts
			this.fs.copy(
				this.templatePath('src/shared/layouts/README.md'),
				'src/shared/layouts/README.md'
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
		}
	}
};