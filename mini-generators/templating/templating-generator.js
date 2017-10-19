'use strict';

exports.questions = function () {
	return [
		{
			when: function (answers) {
				return answers.taskRunner
					&& answers.taskRunner.length;
			},
			type: 'list',
			name: 'templateEngine',
			message: 'Which Template Engine do you want to use?',
			choices: [
				{
					name: 'Mangony with Handlebars',
					value: 'mangonyHbs'
				},
				{
					name: 'Mangony with React',
					value: 'mangonyReact'
				}
			],
			default: 'mangonyHbs'
		}
	];
};

exports.setup = function () {
	this.templateEngine = this.config.get('templateEngine') || 'mangonyHbs';
};

exports.scaffold = function () {
	// add global assemble files
	if (this.templateEngine && this.templateEngine !== '') {

		if (this.templateEngine === 'mangonyHbs') {
			this.fs.copy(
				this.templatePath('gitkeep'),
				'src/shared/utilities/template-helpers/.gitkeep'
			);
			this.fs.copy(
				this.templatePath('src/core/store/core.json'),
				'src/core/store/core.json'
			);
			this.fs.copyTpl(
				this.templatePath('src/core/layouts/lyt-default.hbs.ejs'),
				'src/core/layouts/lyt-default.hbs',
				this
			);
			this.fs.copy(
				this.templatePath('src/core/layouts/docs'),
				'src/core/layouts/docs',
				this
			);
			this.fs.copyTpl(
				this.templatePath('src/pages/index/index.hbs.ejs'),
				'src/pages/index/index.hbs',
				this
			);
			this.fs.copyTpl(
				this.templatePath('src/pages/components/components.hbs.ejs'),
				'src/pages/components/components.hbs',
				this
			);

			// Add global partials
			this.fs.copy(
				this.templatePath('src/core/components/_metadata.hbs'),
				'src/core/components/_metadata.hbs'
			);
			this.fs.copyTpl(
				this.templatePath('src/core/components/_scripts.hbs.ejs'),
				'src/core/components/_scripts.hbs',
				this
			);
			this.fs.copyTpl(
				this.templatePath('src/core/components/_styles.hbs.ejs'),
				'src/core/components/_styles.hbs',
				this
			);
			this.fs.copy(
				this.templatePath('src/shared/components/sitemap'),
				'src/shared/components/sitemap'
			);
		}

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
	} else {
		delete this.pkgFile['devDependencies']['mangony'];
		delete this.pkgFile['devDependencies']['mangony-hbs-helpers'];
		delete this.pkgFile['devDependencies']['grunt-mangony'];
	}
};