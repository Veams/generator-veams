'use strict';
const chalk = require('chalk');
const Generator = require('yeoman-generator');
const autocomplete = require('inquirer-autocomplete-prompt');
const helpers = require('../../lib/helpers');
const blueprintConstruct = require('../../mini-generators/blueprints/construct');
const blueprintPrompts = require('../../mini-generators/blueprints/prompts');
const blueprintSave = require('../../mini-generators/blueprints/save');
const blueprintSetup = require('../../mini-generators/blueprints/setup');
const blueprintScaffold = require('../../mini-generators/blueprints/scaffold');
const blueprintPostInstall = require('../../mini-generators/blueprints/post-install');
const configFile = require('../../lib/config');

module.exports = class extends Generator {

	// note: arguments and options should be defined in the constructor.
	constructor(args, opts) {
		super(args, opts);

		blueprintConstruct.call(this);
	};

	// Initialize general settings and store some files
	initializing() {
		this.config.defaults(configFile.setup.empty);
		this.bindEvents();
	};

	bindEvents() {
		this.on(configFile.events.end, () => {
			blueprintPostInstall.call(this);
		});
	};

	// Custom prompts routine
	prompting() {
		let cb = this.async();
		let prompts = [];

		this.log(
			('\n') + chalk.bgCyan('Create a new blueprint based on Veams or your own templates.') + ('\n')
		);

		prompts = prompts.concat(
			blueprintPrompts.call(this)
		);

		return this.prompt(prompts).then((props) => {
			blueprintSave.call(this, props);

			//save config to .yo-rc.json
			this.config.set(props);
			cb();
		});
	};

	/**
	 * File generation
	 *
	 */
	writing() {
		this.setup();
		this.scaffold();
	};

	setup() {
		blueprintSetup.call(this);
	};

	scaffold() {
		blueprintScaffold.call(this);
	}
};
