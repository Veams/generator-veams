'use strict';
const path = require('path');
const chalk = require('chalk');
const yeoman = require('yeoman-generator');
const gruntGenerator = require('../../generator-files/grunt-generator');
const configFile = require('../../lib/config');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
	};

	// Initialize general settings and store some files
	initializing() {
		this.config.defaults(configFile.setup.empty);
		this.bindEvents();
	};

	bindEvents() {
		this.on(configFile.events.end, () => {
			gruntGenerator.postInstall.call(this);
		});
	};

	// Custom prompts routine
	prompting() {
		this.log(
			('\n') + chalk.bgMagenta('Install your grunt modules') + ('\n') +
			('\n') + chalk.magenta('* Be sure you know what you do') +
			('\n') + chalk.magenta('Additional add your custom grunt task in your Gruntfile.js') + ('\n')
		);

		let questions = [];
		let cb = this.async();

		questions.push({
			name: "helperPath",
			message: "What is the name of your helpers folder?",
			default: "helpers"
		});

		questions.push({
			name: "gruntPath",
			message: "Where do you have your task files?",
			default: "helpers/_grunt"
		});

		questions.push({
			name: "srcPath",
			message: "Where do you have your source files?",
			default: "resources"
		});

		questions = questions.concat(
			gruntGenerator.questions.call(this, {
				taskRunner: [
					'grunt'
				],
				defaults: false
			})
		);

		this.prompt(questions, function (answers) {
			this.helperPath = answers.helperPath;
			this.gruntPath = answers.gruntPath;
			this.srcPath = answers.srcPath;

			this.projectName = this.config.get('projectName');
			this.authorName = this.config.get('projectAuthor');
			this.taskRunner = this.config.get('taskRunner');
			this.templateEngine = this.config.get('templateEngine');
			this.installExtendedLayout = this.config.get('installExtendedLayout');
			this.plugin = this.config.get('plugin');
			this.gulpModules = this.config.get('gulpModules');
			this.gruntModules = answers.gruntModules || this.config.get('gruntModules');
			this.features = this.config.get('features');
			this.jsLibs = this.config.get('jsLibs');
			this.cssLibs = this.config.get('cssLibs');
			this.testAndQA = this.config.get('testAndQA');
			this.testAndQALibs = this.config.get('testAndQALibs');
			this.veamsPackages = this.config.get('veamsPackages');
			this.proxyHost = this.config.get('proxyHost');
			this.proxyPort = this.config.get('proxyPort');

			//save config to .yo-rc.json
			this.config.set(answers);

			cb();
		}.bind(this));
	};

	/**
	 * Grunt modules file generation
	 */
	writing() {
		this.setup();
		this.grunt();

	};

	setup() {
		gruntGenerator.setup.call(this);
	};

	grunt() {
		gruntGenerator.scaffold.call(this, {
			defaults: false,
			installDeps: true
		});
	};

	install() {
		this.installDependencies({
			skipInstall: this.options['skip-install'] || this.options['s'],
			skipMessage: this.options['skip-welcome-message'] || this.options['w']
		});
	};
};