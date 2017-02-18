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
const featuresGenerator = require('../../generator-files/features-generator');
const jsGenerator = require('../../generator-files/js-generator');
const cssGenerator = require('../../generator-files/css-generator');
const expressGenerator = require('../../generator-files/express-generator');
const testAndQAGenerator = require('../../generator-files/test-and-qa-generator');
const gruntGenerator = require('../../generator-files/grunt-generator');
const gulpGenerator = require('../../generator-files/gulp-generator');
const veamsGenerator = require('../../generator-files/veams-generator');
const docsGenerator = require('../../generator-files/generator-docs');
const templatingGenerator = require('../../generator-files/templating-generator');

module.exports = class extends Generator {

	// Initialize general settings and store some files
	initializing() {
		this._ = _;
		this.pkg = require('../../package.json');
		this.pkgFile = this.fs.readJSON(this.templatePath('_package.json'));
		this.bowerFile = this.fs.readJSON(this.templatePath('_bower.json'));
		this.dotFiles = [
			'gitignore',
			'gitattributes',
			'editorconfig',
			'bowerrc',
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
			this.authorName = answers.projectAuthor || this.config.get('projectAuthor');
			this.projectName = answers.projectName || this.config.get('projectName');
			this.selfContained = answers.selfContained || this.config.get('selfContained');
			this.taskRunner = answers.taskRunner;
			this.gulpModules = answers.gulpModules || this.config.get('gulpModules');
			this.gruntModules = answers.gruntModules || this.config.get('gruntModules');
			this.templateEngine = answers.templateEngine || this.config.get('templateEngine');
			this.mangonyExpress = answers.mangonyExpress || this.config.get('mangonyExpress');
			this.installExtendedLayout = answers.installExtendedLayout || this.config.get('installExtendedLayout');
			this.plugin = answers.plugin;
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

		(!this.config.get('projectAuthor') || this.force) && this.questions.push({
			type: 'input',
			name: 'projectAuthor',
			message: 'Would you mind telling me your name?',
			default: this.config.get('projectAuthor')
		});

		(!this.config.get('selfContained') || this.force) && this.questions.push({
			type: 'confirm',
			name: 'selfContained',
			message: 'Do you want to build your project with self-contained components?',
			default: true
		});

		(!this.config.get('taskRunner') || this.force) && this.questions.push(
			taskRunnerGenerator.questions.call(this)
		);

		if (!this.config.get('gruntModules') || this.force) {
			this.questions = this.questions.concat(
				gruntGenerator.questions.call(this)
			);
		}

		(!this.config.get('gulpModules') || this.force) && this.questions.push(
			gulpGenerator.questions.call(this)
		);

		if (!this.config.get('templateEngine') || this.force) {
			this.questions = this.questions.concat(
				templatingGenerator.questions.call(this)
			);
		}

		(!this.config.get('cssLibs') || this.force) && this.questions.push(
			cssGenerator.questions.call(this)
		);

		(!this.config.get('jsLibs') || this.force) && this.questions.push(
			jsGenerator.questions.call(this)
		);

		(!this.config.get('veamsPackages') || this.force) && this.questions.push(
			veamsGenerator.questions.call(this)
		);

		if (!this.config.get('testAndQA') || this.force) {
			this.questions = this.questions.concat(
				testAndQAGenerator.questions.call(this)
			);
		}

		(!this.config.get('docs') || this.force) && this.questions.push(
			docsGenerator.questions.call(this)
		);

		(!this.config.get('features') || this.force) && this.questions.push(
			featuresGenerator.questions.call(this)
		);
	}

	writing() {
		this._setup();
		this._overwriteSetup();
		this._defaults();
		this._scaffold();
		this._bower();
		this._pkg();
	}

	_setup() {
		taskRunnerGenerator.setup.call(this);
		gruntGenerator.setup.call(this);
		gulpGenerator.setup.call(this);
		templatingGenerator.setup.call(this);
		cssGenerator.setup.call(this);
		expressGenerator.setup.call(this);
		jsGenerator.setup.call(this);
		testAndQAGenerator.setup.call(this);
		docsGenerator.setup.call(this);
		featuresGenerator.setup.call(this);
		veamsGenerator.setup.call(this);
	}

	_overwriteSetup() {
		veamsGenerator.overwriteSetup.call(this);
	}

	_defaults() {
		// Standard files

		this.fs.copyTpl(this.templatePath('gitignore'), '.gitignore');
		this.fs.copyTpl(this.templatePath('bowerrc'), '.bowerrc');
		this.fs.copyTpl(
			this.templatePath('helpers/config.js.ejs'),
			'helpers/config.js',
			this
		);
		this.fs.copyTpl(this.templatePath('README.md.ejs'), 'README.md', this);
		this.bowerFile['name'] = helpers.hyphenate(this.config.get('projectName')) || 'minimal-project';
		this.pkgFile['name'] = helpers.hyphenate(this.config.get('projectName')) || 'minimal-project';

		// add specific resources to make it possible to split up some directories

		// Ajax area
		this.fs.copy(
			this.templatePath('gitkeep'),
			'resources/ajax/.gitkeep'
		);

		// Assets area
		this.fs.copy(
			this.templatePath('gitkeep'),
			'resources/assets/media/.gitkeep'
		);

		this.fs.copy(
			this.templatePath('gitkeep'),
			'resources/assets/fonts/.gitkeep'
		);

		this.fs.copy(
			this.templatePath('gitkeep'),
			'resources/assets/img/svg/icons/.gitkeep'
		);

		// JS area
		this.fs.copy(
			this.templatePath('resources/js/README.md'),
			'resources/js/README.md'
		);

		// SCSS area
		this.fs.copy(
			this.templatePath('gitkeep'),
			'resources/scss/helpers/functions/.gitkeep'
		);

		this.fs.copyTpl(
			this.templatePath('resources/scss/global/_print.scss'),
			'resources/scss/global/_print.scss',
			this
		);
		this.fs.copyTpl(
			this.templatePath('resources/scss/universal.scss'),
			'resources/scss/universal.scss',
			this
		);
		this.fs.copyTpl(
			this.templatePath('resources/scss/global/_base.scss.ejs'),
			'resources/scss/global/_base.scss',
			this
		);
		this.fs.copyTpl(
			this.templatePath('resources/scss/global/_vars.scss.ejs'),
			'resources/scss/global/_vars.scss',
			this
		);
		this.fs.copyTpl(
			this.templatePath('resources/scss/_styles.scss.ejs'),
			'resources/scss/styles.scss',
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
		featuresGenerator.scaffold.call(this);
		docsGenerator.scaffold.call(this);
		gulpGenerator.scaffold.call(this);
		taskRunnerGenerator.scaffold.call(this);
		cleanPackages.scaffold.call(this);
	}

	_bower() {
		this.fs.write(this.destinationPath('bower.json'), JSON.stringify(this.bowerFile, null, 4));
	}

	_pkg() {

		this.fs.write(this.destinationPath('package.json'), JSON.stringify(this.pkgFile, null, 4));
	}


	install() {
		this.installDependencies({
			skipInstall: this.options['skip-install'] || this.options['s'],
			skipMessage: this.options['skip-welcome-message'] || this.options['w'],
			// minInstall: this.options['minimal'] || this.options['min'],
			callback: function () {
				// Emit an event that all dependencies are installed
				this.emit(configFile.events.depsIntalled);
			}.bind(this)
		});
	}

	bindEvents() {
		let _this = this;

		this.on(configFile.events.end, function () {
			fs.rename(path.join(this.destinationRoot(), '.yo-rc.json'), path.join(this.destinationRoot(), 'setup.json'), function (err) {
				if (err) _this.log('ERROR: ' + err);
			});
		});
	}
};