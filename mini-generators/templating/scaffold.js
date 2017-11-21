module.exports = function scaffold() {
	// add global template files
	if (this.templateEngine && this.templateEngine !== '') {

		if (this.templateEngine === 'ssr-mangony-hbs') {
			this.fs.copy(
				this.templatePath('gitkeep'),
				'src/app/shared/utilities/template-helpers/.gitkeep'
			);
			this.fs.copy(
				this.templatePath('src/app/core/store/core.json'),
				'src/app/core/store/core.json'
			);
			this.fs.copyTpl(
				this.templatePath('src/app/core/layouts/lyt-default.hbs.ejs'),
				'src/app/core/layouts/lyt-default.hbs',
				this
			);
			this.fs.copy(
				this.templatePath('src/app/core/layouts/docs'),
				'src/app/core/layouts/docs',
				this
			);
			this.fs.copyTpl(
				this.templatePath('src/app/pages/index/index.hbs.ejs'),
				'src/app/pages/index/index.hbs',
				this
			);
			this.fs.copyTpl(
				this.templatePath('src/app/pages/components/components.hbs.ejs'),
				'src/app/pages/components/components.hbs',
				this
			);

			// Add global partials
			this.fs.copy(
				this.templatePath('src/app/core/components/_metadata.hbs'),
				'src/app/core/components/_metadata.hbs'
			);
			this.fs.copyTpl(
				this.templatePath('src/app/core/components/_scripts.hbs.ejs'),
				'src/app/core/components/_scripts.hbs',
				this
			);
			this.fs.copyTpl(
				this.templatePath('src/app/core/components/_styles.hbs.ejs'),
				'src/app/core/components/_styles.hbs',
				this
			);
			this.fs.copy(
				this.templatePath('src/app/shared/components/sitemap'),
				'src/app/shared/components/sitemap'
			);

			this.fs.copy(
				this.templatePath(this.generatorHelperPath + 'tasks/mangony.config.js'),
				this.helperPath + 'tasks/mangony.config.js'
			);

			if (this.taskRunner === 'grunt') {
				// Add Gruntfile-helper file
				this.fs.copyTpl(
					this.templatePath(this.generatorGruntPath + '_mangony.js.ejs'),
					this.gruntPath + 'mangony.js',
					this
				);

			} else {
				delete this.pkgFile['devDependencies']['grunt-mangony'];
			}
		}

		if (this.templateEngine === 'ssr-react') {
			this.fs.copy(
				this.templatePath('gitignore'),
				'src/app/pages/.gitignore'
			);

			this.fs.copy(
				this.templatePath('gitignore'),
				'src/app/features/.gitignore'
			);
		}
	} else {
		delete this.pkgFile['devDependencies']['mangony'];
		delete this.pkgFile['devDependencies']['mangony-hbs-helpers'];
		delete this.pkgFile['devDependencies']['grunt-mangony'];
	}
};