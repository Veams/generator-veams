'use strict';
const chalk = require('chalk');
const Generator = require('yeoman-generator');
const helpers = require('../../lib/helpers');
const generatorBlueprint = require('../../generator-files/generator-blueprint.js');
const configFile = require('../../lib/config');

module.exports = class extends Generator {

	// note: arguments and options should be defined in the constructor.
	constructor(args, opts) {
		super(args, opts);

		generatorBlueprint.construct.call(this);
	};

	// Initialize general settings and store some files
	initializing() {
		this.config.defaults(configFile.setup.empty);
		this.bindEvents();
	};

	bindEvents() {
		this.on(configFile.events.end, () => {
			generatorBlueprint.postInstall.call(this);
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
			generatorBlueprint.questions.call(this)
		);

		return this.prompt(prompts).then((props) => {
			generatorBlueprint.save.call(this, props);

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
		generatorBlueprint.setup.call(this);
	};

	scaffold() {
		generatorBlueprint.scaffold.call(this);
	}
};
