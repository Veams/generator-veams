'use strict';
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var pgHelpers = require('../../lib/pg-helpers');
var taskRunnerGenerator = require('../../generator-files/taskrunner-generator');
var featuresGenerator = require('../../generator-files/features-generator');
var jsGenerator = require('../../generator-files/js-generator');
var cssGenerator = require('../../generator-files/css-generator');
var testAndQAGenerator = require('../../generator-files/test-and-qa-generator');
var gruntGenerator = require('../../generator-files/grunt-generator');
var gulpGenerator = require('../../generator-files/gulp-generator');
var pgGenerator = require('../../generator-files/pg-generator');
var templatingGenerator = require('../../generator-files/templating-generator');

module.exports = yeoman.generators.Base.extend({

	// Initialize general settings and store some files
	initializing: function () {
		this.pkg = require('../../package.json');
		this.bowerFile = this.src.readJSON('_bower.json');

		this.dotFiles = [
			'gitignore',
			'gitattributes',
			'editorconfig',
			'bowerrc',
			'jshintrc'
		];
		//
		this.config.defaults({
			projectName: '',
			projectAuthor: '',
			taskRunner: [
				'grunt'
			],
			templateEngine: '',
			installExtendedLayout: false,
			installPlugin: false,
			gulpModules: [],
			gruntModules: [
				'grunt-combine-mq',
				'grunt-dr-svg-sprites'
			],
			features: [
				'sassInsteadOfCompass'
			],
			jsLibs: [],
			cssLibs: [],
			testAndQA: false,
			testAndQALibs: [],
			pgPackages: [],
			installProxy: false,
			proxyHost: '0.0.0.0 ',
			proxyPort: 80
		});
	},

	selectRoutine: function () {
		var cb = this.async();
		var force = false;
		var prompts = [];

		// welcome message
		var welcome = pgHelpers.welcome;

		if (!this.options['skip-welcome-message']) {
			this.log(welcome);
		}

		if (!this.config.existed) {
			force = true;
		}

		(!this.config.get('defaultInstall') || force) && prompts.push({
			name: 'defaultInstall',
			type: 'list',
			message: 'Choose your installation routine:',
			choices: [
				{
					name: 'Minimal Installation',
					value: 'stdInstall'
				},
				{
					name: 'Custom Installation',
					value: 'customInstall'
				}
			],
			default: this.config.get('defaultInstall')
		});

		this.prompt(prompts, function (answers) {

			this.defaultInstall = answers.defaultInstall || this.config.get('defaultInstall');

			//save config to .yo-rc.json
			if (this.defaultInstall === 'stdInstall') {
				this.log(
					('\n') + chalk.bgCyan('Standard installation routine selected.') + ('\n')
				);
				this.projectName = this.config.get('projectName');
				this.authorName = this.config.get('projectAuthor');
				this.taskRunner = this.config.get('taskRunner');
				this.templateEngine = this.config.set('templateEngine', 'assemble');
				this.installExtendedLayout = this.config.set('installExtendedLayout', true);
				this.plugin = this.config.get('plugin');
				this.gulpModules = this.config.get('gulpModules');
				this.gruntModules = this.config.get('gruntModules');
				this.features = this.config.get('features');
				this.jsLibs = this.config.get('jsLibs');
				this.cssLibs = this.config.get('cssLibs');
				this.testAndQA = this.config.get('testAndQA');
				this.testAndQALibs = this.config.get('testAndQALibs');
				this.pgPackages = this.config.get('pgPackages');
				this.proxyHost = this.config.get('proxyHost');
				this.proxyPort = this.config.get('proxyPort');

				//save config to .yo-rc.json
				this.config.set(answers);
				cb();
			} else {
				this.log(
					('\n') + chalk.green('Custom installation routine selected.') + ('\n')
				);
				this._prompting();
			}
		}.bind(this));
	},

	_prompting: function () {
		var cb = this.async();
		this.force = false;
		this.questions = [];

		if (!this.config.existed) {
			this.force = true;
		}

		this._prompts();

		this.prompt(this.questions, function (answers) {
			this.authorName = answers.projectAuthor || this.config.get('projectAuthor');
			this.projectName = answers.projectName || this.config.get('projectName');
			this.taskRunner = answers.taskRunner;
			this.gulpModules = answers.gulpModules || this.config.get('gulpModules');
			this.gruntModules = answers.gruntModules || this.config.get('gruntModules');
			this.templateEngine = answers.templateEngine || this.config.get('templateEngine');
			this.installExtendedLayout = answers.installExtendedLayout || this.config.get('installExtendedLayout');
			this.plugin = answers.plugin;
			this.features = answers.features;
			this.jsLibs = answers.jsLibs;
			this.cssLibs = answers.cssLibs;
			this.testAndQA = answers.testAndQA;
			this.testAndQALibs = answers.testAndQALibs;
			this.pgPackages = answers.pgPackages;
			this.proxyHost = this.config.get('proxyHost');
			this.proxyPort = this.config.get('proxyPort');

			//save config to .yo-rc.json
			this.config.set(answers);
			cb();

		}.bind(this));
	},

	_prompts: function () {
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

		(!this.config.get('taskRunner') || this.force) && this.questions.push(
			taskRunnerGenerator.questions.call(this)
		);

		(!this.config.get('features') || this.force) && this.questions.push(
			featuresGenerator.questions.call(this)
		);

		(!this.config.get('jsLibs') || this.force) && this.questions.push(
			cssGenerator.questions.call(this)
		);

		(!this.config.get('cssLibs') || this.force) && this.questions.push(
			jsGenerator.questions.call(this)
		);

		if (!this.config.get('testAndQA') || this.force) {
			this.questions = this.questions.concat(
				testAndQAGenerator.questions.call(this)
			);
		}

		(!this.config.get('pgPackages') || this.force) && this.questions.push(
			pgGenerator.questions.call(this)
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
	},

	writing: {
		setup: function () {
			taskRunnerGenerator.setup.call(this);
			featuresGenerator.setup.call(this);
			jsGenerator.setup.call(this);
			cssGenerator.setup.call(this);
			testAndQAGenerator.setup.call(this);
			gruntGenerator.setup.call(this);
			gulpGenerator.setup.call(this);
			pgGenerator.setup.call(this);
			templatingGenerator.setup.call(this);
		},

		defaults: function () {
			// Standard files
			this.copy('gitignore', '.gitignore');
			this.copy('bowerrc', '.bowerrc');
			this.template('_package.json.ejs', 'package.json');
			this.template('helpers/config.js.ejs', 'helpers/config.js');
			this.template('README.md.ejs', 'README.md');
			this.bowerFile['name'] = this.config.get('projectName');

			this.mkdir('_output');

			// add specific resources to make it possible to split up some directories
			this.mkdir('_output/js');
			this.mkdir('resources');
			this.mkdir('resources/ajax');
			this.mkdir('resources/assets');
			this.mkdir('resources/assets/img');
			this.mkdir('resources/assets/img/temp');
			this.mkdir('resources/assets/img/svg');
			this.mkdir('resources/assets/img/svg/icons');
			this.mkdir('resources/assets/fonts');
			this.mkdir('resources/assets/media');
			this.mkdir('resources/js');
			this.mkdir('resources/scss');
			this.mkdir('resources/scss/utils/extends');
			this.mkdir('resources/scss/utils/mixins');
			this.copy('resources/scss/global/_print.scss');
			this.copy('resources/scss/universal.scss');

			this.template('resources/scss/global/_base.scss.ejs', 'resources/scss/global/_base.scss');
			this.template('resources/scss/global/_vars.scss.ejs', 'resources/scss/global/_vars.scss');
			this.template('resources/scss/_styles.scss.ejs', 'resources/scss/styles.scss');
		},

		scaffold: function () {
			taskRunnerGenerator.scaffold.call(this);
			featuresGenerator.scaffold.call(this);
			jsGenerator.scaffold.call(this);
			cssGenerator.scaffold.call(this);
			testAndQAGenerator.scaffold.call(this);
			pgGenerator.scaffold.call(this);
			templatingGenerator.scaffold.call(this);

			if (this.taskRunner.indexOf('gulp') !== -1) gulpGenerator.scaffold.call(this);
			if (this.taskRunner.indexOf('grunt') !== -1) gruntGenerator.scaffold.call(this);
		},

		bower: function () {
			if (this.cssLibs.length === 0 && this.jsLibs.length === 0 && this.pgPackages.length === 0) {
				this.bowerFile['dependencies'] = [];
			}
			this.dest.write('bower.json', JSON.stringify(this.bowerFile, null, 4));
		}
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install'] || this.options['s'],
			skipMessage: this.options['skip-welcome-message'] || this.options['w'],
			standardInstall: this.options['standard'] || this.options['std']
		});
	}
});