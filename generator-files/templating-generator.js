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
			message: 'Which Template Engine do you want to install?',
			choices: [
				{name: 'Mangony', value: 'mangony'},
				{name: 'Assemble (Only usable in Grunt!)', value: 'assemble'},
				{name: 'none', value: ''}
			],
			default: 'mangony'
		},
		{
			when: function (answers) {
				return answers.templateEngine
					&& answers.templateEngine.length
					&& answers.templateEngine.indexOf('mangony') !== -1
					&& answers.taskRunner.indexOf('grunt') !== -1;
			},
			type: 'confirm',
			name: 'mangonyExpress',
			message: 'Do you want to use Mangony with grunt-express?',
			default: this.config.get('mangonyExpress')
		},
		{
			when: function (answers) {
				return answers.templateEngine
					&& answers.templateEngine.length
					&& answers.templateEngine.indexOf('assemble') !== -1;
			},
			type: 'confirm',
			message: 'Do you want to use Extended Layouts in Assemble?',
			name: 'installExtendedLayout',
			default: true
		}
	];
};

exports.setup = function () {
	this.templateEngine = this.config.get('templateEngine') || '';
};

exports.scaffold = function () {
	// add global assemble files
	if (this.templateEngine && this.templateEngine !== '') {

		this.fs.copy(
			this.templatePath('gitkeep'),
			'resources/templating/ajax/.gitkeep'
		);
		this.fs.copy(
			this.templatePath('gitkeep'),
			'resources/templating/helpers/.gitkeep'
		);
		this.fs.copy(
			this.templatePath('resources/templating/data/config.json'),
			'resources/templating/data/config.json'
		);
		this.fs.copyTpl(
			this.templatePath('resources/templating/layouts/lyt-default.hbs.ejs'),
			'resources/templating/layouts/lyt-default.hbs',
			this
		);
		this.fs.copyTpl(
			this.templatePath('resources/templating/pages/index.hbs.ejs'),
			'resources/templating/pages/index.hbs',
			this
		);
		this.fs.copyTpl(
			this.templatePath('resources/templating/pages/page-components.hbs.ejs'),
			'resources/templating/pages/page-components.hbs',
			this
		);

		// Add global partials
		this.fs.copy(
			this.templatePath('resources/templating/partials/_global/_metadata.hbs'),
			'resources/templating/partials/_global/_metadata.hbs'
		);
		this.fs.copyTpl(
			this.templatePath('resources/templating/partials/_global/_scripts.hbs.ejs'),
			'resources/templating/partials/_global/_scripts.hbs',
			this
		);
		this.fs.copy(
			this.templatePath('resources/templating/partials/_global/_styles.hbs'),
			'resources/templating/partials/_global/_styles.hbs'
		);

		// Add HTML build task for gulp
		if (this.taskRunner.indexOf('gulp') !== -1) {
			this.fs.copyTpl(
				this.templatePath('helpers/_gulp/_html.js.ejs'),
				'helpers/_gulp/html.js',
				this
			);
		}

		if (this.templateEngine.indexOf('assemble') !== -1) {
			// Add Gruntfile-helper file
			this.fs.copyTpl(
				this.templatePath('helpers/_grunt/_assemble.js.ejs'),
				'helpers/_grunt/assemble.js',
				this
			);

			// Add template helpers
			this.fs.copy(
				this.templatePath('resources/templating/helpers/**/*'),
				'resources/templating/helpers'
			);
		} else {
			delete this.pkgFile['devDependencies']['assemble'];
			delete this.pkgFile['devDependencies']['mangony-hbs-helpers'];
		}

		if (this.templateEngine.indexOf('mangony') !== -1) {
			// Add Gruntfile-helper file
			if (this.taskRunner.indexOf('gulp') !== -1) {
				delete this.pkgFile['devDependencies']['grunt-mangony'];
				delete this.pkgFile['devDependencies']['grunt-open'];

			} else {
				this.fs.copyTpl(
					this.templatePath('helpers/_grunt/_mangony.js.ejs'),
					'helpers/_grunt/mangony.js',
					this
				);

				if (this.mangonyExpress === true) {
					this.gruntModules.push('grunt-open');

					this.fs.copy(
						this.templatePath(this.generatorGruntPath + 'open.js'),
						this.gruntPath + 'open.js'
					);
				} else {
					delete this.pkgFile['devDependencies']['grunt-open'];
					delete this.pkgFile['devDependencies']['mangony'];
				}
			}
		} else {
			delete this.pkgFile['devDependencies']['mangony'];
			delete this.pkgFile['devDependencies']['grunt-mangony'];
			delete this.pkgFile['devDependencies']['grunt-open'];
		}
	} else {
		delete this.pkgFile['devDependencies']['assemble'];
		delete this.pkgFile['devDependencies']['mangony'];
		delete this.pkgFile['devDependencies']['mangony-hbs-helpers'];
		delete this.pkgFile['devDependencies']['grunt-mangony'];
		delete this.pkgFile['devDependencies']['grunt-open'];
	}
};