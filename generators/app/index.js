'use strict';
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const _ = require('lodash');
const Generator = require('yeoman-generator');
const helpers = require('../../lib/helpers');
const configFile = require('../../lib/config');

/**
 * Scaffold files
 */
const cleanPackages = require('../../mini-generators/clean-packages');
const testAndQAGenerator = require('../../mini-generators/test-and-qa-generator');
const gruntGenerator = require('../../mini-generators/grunt-generator');
const veamsGenerator = require('../../mini-generators/veams-generator');
const docsGenerator = require('../../mini-generators/generator-docs');
const templatingGenerator = require('../../mini-generators/templating/templating-generator');

/**
 * Prompt files
 */
const projectTypePrompt = require('../../mini-generators/project-type/prompts');
const taskRunnerPrompt = require('../../mini-generators/taskrunner/prompts');
const iconsPrompt = require('../../mini-generators/icons/prompts');
const cssPostProcessorsPrompt = require('../../mini-generators/css-post-processors/prompts');
const cssFrameworksPrompt = require('../../mini-generators/css-frameworks/prompts');
const jsPrompt = require('../../mini-generators/js/prompts');

/**
 * Setup Files
 */
const projectTypeSetup = require('../../mini-generators/project-type/setup');
const taskRunnerSetup = require('../../mini-generators/taskrunner/setup');
const iconsSetup = require('../../mini-generators/icons/setup');
const cssPostProcessorsSetup = require('../../mini-generators/css-post-processors/setup');
const cssFrameworksSetup = require('../../mini-generators/css-frameworks/setup');
const jsSetup = require('../../mini-generators/js/setup');

/**
 * Scaffold Files
 */
const projectTypeScaffold = require('../../mini-generators/project-type/scaffold');
const cssFrameworksScaffold = require('../../mini-generators/css-frameworks/scaffold');
const expressScaffold = require('../../mini-generators/express/scaffold');
const taskRunnerScaffold = require('../../mini-generators/taskrunner/scaffold');
const jsScaffold = require('../../mini-generators/js/scaffold');


module.exports = class extends Generator {

	// Initialize general settings and store some files
	initializing() {
		this._ = _;
		this.pkg = require('../../package.json');
		this.pkgFile = this.fs.readJSON(this.templatePath('_package.json'));
		this.veamsFile = this.fs.readJSON(this.templatePath('veams-cli.json'));
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
			this.projectType = answers.projectType;
			this.taskRunner = answers.taskRunner;
			this.gruntModules = this.config.get('gruntModules');
			this.templateEngine = answers.templateEngine || this.config.get('templateEngine');
			this.features = answers.features;
			this.jsLibs = answers.jsLibs;
			this.cssLibs = answers.cssLibs;
			this.testAndQA = answers.testAndQA;
			this.testAndQALibs = answers.testAndQALibs;
			this.veamsPackages = answers.veamsPackages;
			this.icons = answers.icons;
			this.cssPostProcessors = answers.cssPostProcessors;

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

		(!this.config.get('projectType') || this.force) && this.questions.push(
			projectTypePrompt.call(this)
		);

		(!this.config.get('taskRunner') || this.force) && this.questions.push(
			taskRunnerPrompt.call(this)
		);

		/*if (!this.config.get('gruntModules') || this.force) {
		 this.questions = this.questions.concat(
		 gruntGenerator.questions.call(this)
		 );
		 }*/

		(!this.config.get('icons') || this.force) && this.questions.push(
			iconsPrompt.call(this)
		);

		(!this.config.get('cssLibs') || this.force) && this.questions.push(
			cssFrameworksPrompt.call(this)
		);

		(!this.config.get('cssPostProcessors') || this.force) && this.questions.push(
			cssPostProcessorsPrompt.call(this)
		);

		(!this.config.get('jsLibs') || this.force) && this.questions.push(
			jsPrompt.call(this)
		);

		if (!this.config.get('templateEngine') || this.force) {
			this.questions = this.questions.concat(
				templatingGenerator.questions.call(this)
			);
		}


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
		projectTypeSetup.call(this);
		taskRunnerSetup.call(this);
		iconsSetup.call(this);
		cssFrameworksSetup.call(this);
		cssPostProcessorsSetup.call(this);
		jsSetup.call(this);
		gruntGenerator.setup.call(this);
		templatingGenerator.setup.call(this);
		testAndQAGenerator.setup.call(this);
		docsGenerator.setup.call(this);
		veamsGenerator.setup.call(this);
	}

	_overwriteSetup() {
		veamsGenerator.overwriteSetup.call(this);
	}

	_defaults() {
		// Standard files
		this.fs.copy(this.templatePath('babelrc'), '.babelrc');
		this.fs.copyTpl(this.templatePath('gitignore'), '.gitignore');
		this.fs.copyTpl(this.templatePath('editorconfig'), '.editorconfig');
		this.fs.copyTpl(this.templatePath('README.md.ejs'), 'README.md', this);
		this.fs.copy(
			this.templatePath(this.generatorHelperPath + 'environments'),
			this.destinationPath(this.helperPath + 'environments')
		);
		this.pkgFile['name'] = helpers.hyphenate(this.config.get('projectName')) || 'veams-project';

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
			'src/core/layouts/.gitkeep'
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
			this.templatePath('src/core/styles/_print.scss'),
			'src/core/app/styles/_print.scss',
			this
		);
		this.fs.copyTpl(
			this.templatePath('src/core/styles/_core.scss.ejs'),
			'src/core/styles/_core.scss',
			this
		);
		this.fs.copyTpl(
			this.templatePath('src/_app.scss.ejs'),
			'src/app.scss',
			this
		);
	}

	_scaffold() {
		projectTypeScaffold.call(this);
		cssFrameworksScaffold.call(this);
		jsScaffold.call(this);
		veamsGenerator.scaffold.call(this);
		gruntGenerator.scaffold.call(this);
		expressScaffold.call(this);
		testAndQAGenerator.scaffold.call(this);
		templatingGenerator.scaffold.call(this);
		docsGenerator.scaffold.call(this);
		taskRunnerScaffold.call(this);
		cleanPackages.scaffold.call(this);
	}

	_pkg() {
		this.fs.write(this.destinationPath('package.json'), JSON.stringify(this.pkgFile, null, 4));
		this.fs.write(this.destinationPath('veams-cli.json'), JSON.stringify(this.veamsFile, null, 4));
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
					this.log(`That’s it. Start your project with ${chalk.green('npm run start')} or ${chalk.green(
						'yarn start')}!`);
				}
				// Emit an event that all dependencies are installed
				this.emit(configFile.events.depsIntalled);
			}.bind(this)
		});
	}

	bindEvents() {
		let _this = this;

		this.on(configFile.events.end, () => {
			fs.rename(path.join(this.destinationRoot(), '.yo-rc.json'), path.join(this.destinationRoot(), 'setup.json'),
				function (err) {
					if (err) {
						_this.log('ERROR: ' + err);
					}
				});
		});
	}
};