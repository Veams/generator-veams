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
			default: true
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
			'src/shared/utilities/template-helpers/.gitkeep'
		);
		this.fs.copy(
			this.templatePath('src/store/config.json'),
			'src/store/config.json'
		);
		this.fs.copyTpl(
			this.templatePath('src/shared/layouts/lyt-default.hbs.ejs'),
			'src/shared/layouts/lyt-default.hbs',
			this
		);
		this.fs.copyTpl(
			this.templatePath('src/containers/pages/index/index.hbs.ejs'),
			'src/containers/pages/index/index.hbs',
			this
		);
		this.fs.copyTpl(
			this.templatePath('src/containers/pages/components/components.hbs.ejs'),
			'src/containers/pages/components/components.hbs',
			this
		);

		// Add global partials
		this.fs.copy(
			this.templatePath('src/shared/components/globals/_metadata.hbs'),
			'src/shared/components/globals/_metadata.hbs'
		);
		this.fs.copyTpl(
			this.templatePath('src/shared/components/globals/_scripts.hbs.ejs'),
			'src/shared/components/globals/_scripts.hbs',
			this
		);
		this.fs.copyTpl(
			this.templatePath('src/shared/components/globals/_styles.hbs.ejs'),
			'src/shared/components/globals/_styles.hbs',
			this
		);

		// Add HTML build task for gulp
		if (this.taskRunner.indexOf('gulp') !== -1) {
			this.fs.copyTpl(
				this.templatePath(this.generatorGulpPath + '_html.js.ejs'),
				this.gulpPath + 'html.js',
				this
			);
		}

		if (this.templateEngine.indexOf('assemble') !== -1) {
			// Add Gruntfile-helper file
			this.fs.copyTpl(
				this.templatePath(this.generatorGruntPath + '_assemble.js.ejs'),
				this.gruntPath + 'assemble.js',
				this
			);

			// Add template helpers
			this.fs.copy(
				this.templatePath('src/shared/utilities/template-helpers/**/*'),
				'src/shared/utilities/template-helpers'
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
					this.templatePath(this.generatorGruntPath + '_mangony.js.ejs'),
					this.gruntPath + 'mangony.js',
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