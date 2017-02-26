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
		if (this.taskRunner.indexOf('gulp') === -1) {
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

		return;
	}

	if (this.veamsPackages) {
		this.fs.copy(
			this.templatePath('resources/scss/global/_get-media.scss'),
			'resources/scss/global/_get-media.scss'
		);

		if (this.templateEngine !== '') {
			// Data
			this.fs.copy(
				this.templatePath('gitkeep'),
				'resources/templating/data/blocks/.gitkeep'
			);
			this.fs.copy(
				this.templatePath('gitkeep'),
				'resources/templating/data/pages/.gitkeep'
			);
			this.fs.copy(
				this.templatePath('gitkeep'),
				'resources/templating/data/_global/.gitkeep'
			);

			// Layouts
			this.fs.copy(
				this.templatePath('resources/templating/layouts/README.md'),
				'resources/templating/layouts/README.md'
			);

			// Blocks
			this.fs.copy(
				this.templatePath('resources/templating/partials/blocks/README.md'),
				'resources/templating/partials/blocks/README.md'
			);

			// Components
			this.fs.copy(
				this.templatePath('resources/templating/partials/components/README.md'),
				'resources/templating/partials/components/README.md'
			);

			// Utilities
			this.fs.copy(
				this.templatePath('resources/templating/partials/utilities/README.md'),
				'resources/templating/partials/utilities/README.md'
			);
		}

		// SCSS
		if (!this.selfContained) {
			this.fs.copy(
				this.templatePath('gitkeep'),
				'resources/scss/blocks/.gitkeep'
			);
			this.fs.copy(
				this.templatePath('gitkeep'),
				'resources/scss/utilities/.gitkeep'
			);
			this.fs.copy(
				this.templatePath('gitkeep'),
				'resources/scss/components/.gitkeep'
			);
			this.fs.copy(
				this.templatePath('gitkeep'),
				'resources/scss/layouts/.gitkeep'
			);
		}
	}
};