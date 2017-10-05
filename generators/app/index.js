'use strict';
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const _ = require('lodash');
const Generator = require('yeoman-generator');
const helpers = require('../../lib/helpers');
const configFile = require('../../lib/config');
const taskRunnerGenerator = require('../../generator-files/taskrunner-generator');
const cleanPackages = require('../../generator-files/clean-packages');
const jsGenerator = require('../../generator-files/js-generator');
const cssGenerator = require('../../generator-files/css-generator');
const expressGenerator = require('../../generator-files/express-generator');
const testAndQAGenerator = require('../../generator-files/test-and-qa-generator');
const gruntGenerator = require('../../generator-files/grunt-generator');
const veamsGenerator = require('../../generator-files/veams-generator');
const docsGenerator = require('../../generator-files/generator-docs');
const templatingGenerator = require('../../generator-files/templating-generator');

module.exports = class extends Generator {

	// Initialize general settings and store some files
	initializing() {
		this._ = _;
		this.pkg = require('../../package.json');
		this.pkgFile = this.fs.readJSON(this.templatePath('_package.json'));
		this.dotFiles = [
			'gitignore',
			'gitattributes',
			'editorconfig',
			'jshintrc'
		];

		this.config.defaults(configFile.setup.empty);
	}

	prompting() {
		let cb = this.async();
		this.force = false;
		this.questions = [];

		let welcome = helpers.welcome;

		if (!this.options['skip-welcome-message']) {
			this.log(welcome);
		}

		if (!this.config.existed) {
			this.force = true;
		}

		this._prompts();

		return this.prompt(this.questions).then((answers) => {
			this.projectName = answers.projectName || this.config.get('projectName');
			this.taskRunner = answers.taskRunner;
			this.gruntModules = answers.gruntModules || this.config.get('gruntModules');
			this.templateEngine = answers.templateEngine || this.config.get('templateEngine');
			this.features = answers.features;
			this.jsLibs = answers.jsLibs;
			this.cssLibs = answers.cssLibs;
			this.testAndQA = answers.testAndQA;
			this.testAndQALibs = answers.testAndQALibs;
			this.veamsPackages = answers.veamsPackages;

			//save config to .yo-rc.json
			this.config.set(answers);
			cb();
		});
	}

	_prompts() {
		(!this.config.get('projectName') || this.force) && this.questions.push({
			type: 'input',
			name: 'projectName',
			message: 'Your project name',
			default: this.appname
		});

		(!this.config.get('taskRunner') || this.force) && this.questions.push(
			taskRunnerGenerator.questions.call(this)
		);

		if (!this.config.get('gruntModules') || this.force) {
			this.questions = this.questions.concat(
				gruntGenerator.questions.call(this)
			);
		}

		if (!this.config.get('templateEngine') || this.force) {
			this.questions = this.questions.concat(
				templatingGenerator.questions.call(this)
			);
		}

		(!this.config.get('veamsPackages') || this.force) && this.questions.push(
			veamsGenerator.questions.call(this)
		);

		(!this.config.get('cssLibs') || this.force) && this.questions.push(
			cssGenerator.questions.call(this)
		);

		(!this.config.get('jsLibs') || this.force) && this.questions.push(
			jsGenerator.questions.call(this)
		);

		if (!this.config.get('testAndQA') || this.force) {
			this.questions = this.questions.concat(
				testAndQAGenerator.questions.call(this)
			);
		}

		// (!this.config.get('docs') || this.force) && this.questions.push(
		// 	docsGenerator.questions.call(this)
		// );
	}

	writing() {
		this._setup();
		this._overwriteSetup();
		this._defaults();
		this._scaffold();
		this._pkg();
	}

	_setup() {
		taskRunnerGenerator.setup.call(this);
		gruntGenerator.setup.call(this);
		templatingGenerator.setup.call(this);
		cssGenerator.setup.call(this);
		expressGenerator.setup.call(this);
		jsGenerator.setup.call(this);
		testAndQAGenerator.setup.call(this);
		docsGenerator.setup.call(this);
		veamsGenerator.setup.call(this);
	}

	_overwriteSetup() {
		veamsGenerator.overwriteSetup.call(this);
	}

	_defaults() {
		// Standard files
		this.fs.copy(this.templatePath('veams-cli.json'), 'veams-cli.json');
		this.fs.copyTpl(this.templatePath('gitignore'), '.gitignore');
		this.fs.copyTpl(this.templatePath('editorconfig'), '.editorconfig');
		this.fs.copyTpl(this.templatePath('README.md.ejs'), 'README.md', this);
		this.fs.copy(
			this.templatePath(this.generatorHelperPath + 'environments'),
			this.destinationPath(this.helperPath + 'environments')
		);
		this.pkgFile['name'] = helpers.hyphenate(this.config.get('projectName')) || 'minimal-project';

		// add specific resources to make it possible to split up some directories

		// General structure
		this.fs.copy(
			this.templatePath('gitkeep'),
			'src/shared/components/.gitkeep'
		);

		this.fs.copy(
			this.templatePath('gitkeep'),
			'src/shared/utilities/.gitkeep'
		);

		this.fs.copy(
			this.templatePath('gitkeep'),
			'src/shared/layouts/.gitkeep'
		);

		this.fs.copy(
			this.templatePath('gitkeep'),
			'src/core/.gitkeep'
		);

		this.fs.copy(
			this.templatePath('gitkeep'),
			'src/core/store/.gitkeep'
		);
		this.fs.copy(
			this.templatePath('gitkeep'),
			'src/core/app/.gitkeep'
		);

		// Assets area
		this.fs.copy(
			this.templatePath('gitkeep'),
			'src/assets/media/.gitkeep'
		);

		this.fs.copy(
			this.templatePath('gitkeep'),
			'src/assets/fonts/.gitkeep'
		);

		this.fs.copy(
			this.templatePath('gitkeep'),
			'src/assets/icons/.gitkeep'
		);

		// JS area
		this.fs.copy(
			this.templatePath('src/shared/scripts/README.md'),
			'src/shared/scripts/README.md'
		);

		/**
		 * SCSS Area
		 */

		// Shared
		this.fs.copyTpl(
			this.templatePath('src/shared/styles/helpers/_helpers.scss.ejs'),
			'src/shared/styles/helpers/_helpers.scss',
			this
		);

		this.fs.copy(
			this.templatePath('gitkeep'),
			'src/shared/styles/helpers/functions/.gitkeep'
		);

		this.fs.copyTpl(
			this.templatePath('src/shared/styles/global/_vars.scss.ejs'),
			'src/shared/styles/global/_vars.scss',
			this
		);

		this.fs.copyTpl(
			this.templatePath('src/shared/styles/_shared.scss'),
			'src/shared/styles/_shared.scss',
			this
		);

		// App
		this.fs.copyTpl(
			this.templatePath('src/core/app/styles/_print.scss'),
			'src/core/app/styles/_print.scss',
			this
		);
		this.fs.copyTpl(
			this.templatePath('src/core/app/styles/universal.scss'),
			'src/core/app/styles/universal.scss',
			this
		);
		this.fs.copyTpl(
			this.templatePath('src/core/app/styles/_app.scss.ejs'),
			'src/core/app/styles/_app.scss',
			this
		);
		this.fs.copyTpl(
			this.templatePath('src/core/app/styles/_main.scss.ejs'),
			'src/core/app/styles/main.scss',
			this
		);
	}

	_scaffold() {
		veamsGenerator.scaffold.call(this);
		gruntGenerator.scaffold.call(this);
		jsGenerator.scaffold.call(this);
		cssGenerator.scaffold.call(this);
		expressGenerator.scaffold.call(this);
		testAndQAGenerator.scaffold.call(this);
		templatingGenerator.scaffold.call(this);
		docsGenerator.scaffold.call(this);
		taskRunnerGenerator.scaffold.call(this);
		cleanPackages.scaffold.call(this);
	}

	_pkg() {
		this.fs.write(this.destinationPath('package.json'), JSON.stringify(this.pkgFile, null, 4));
	}

	install() {
		this.installDependencies({
			yarn: true,
			bower: false,
			npm: false,
			skipInstall: this.options['skip-install'] || this.options['s'],
			skipMessage: this.options['skip-welcome-message'] || this.options['w'],
			// minInstall: this.options['minimal'] || this.options['min'],
			callback: function (error) {
				if (error) {
					this.log(`… or alternatively run ${chalk.yellow('npm install')} instead.`);
				} else {
					this.log(`That’s it. Start your project with ${chalk.green('npm run start')} or ${chalk.green('yarn start')}!`);
				}
				// Emit an event that all dependencies are installed
				this.emit(configFile.events.depsIntalled);
			}.bind(this)
		});
	}

	bindEvents() {
		let _this = this;

		this.on(configFile.events.end, () => {
			fs.rename(path.join(this.destinationRoot(), '.yo-rc.json'), path.join(this.destinationRoot(), 'setup.json'), function (err) {
				if (err) _this.log('ERROR: ' + err);
			});
		});
	}
};