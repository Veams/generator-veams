const globby = require('globby');
const helpers = require('../../lib/helpers');
const bpHelpers = require('./helpers/bp-helpers');
const configFile = helpers.getProjectConfig();

module.exports = function construct() {
	this.argument('type', {
		type: String,
		required: true
	});

	this.argument('name', {
		type: String,
		required: true
	});

	this.argument('path', {
		type: String,
		required: true
	});

	// This method adds support for flags
	this.option('config');
	this.option('skipDefaults');

	// Construct base prompts and vars by checking veams-cli.json
	this.customPromptMixins = require(`./mixins/${configFile.projectType}`);
	this.bpFiles = [];
	this.customTypeConfig = {};
	let tplPath = `${this.templatePath()}/component`;
	let currentBpPath = `${tplPath}`;

	if (configFile.blueprints && configFile.blueprints[ this.options.type ]) {
		this.customTypeConfig = configFile.blueprints[ this.options.type ];
		this.skipByConfig = this.customTypeConfig.skipImports;

		if (this.customTypeConfig.path) {
			this.customPromptMixins = require(`${process.cwd()}/${this.customTypeConfig.path}/prompts`);
			currentBpPath = `${process.cwd()}/${this.customTypeConfig.path}/templates`;
		} else {
			if (this.customTypeConfig.prompts) {
				this.customPromptMixins = require(`${process.cwd()}/${this.customTypeConfig.prompts}`);
			}

			if (this.customTypeConfig.templates) {
				currentBpPath = `${process.cwd()}/${this.customTypeConfig.templates}`;
			}
		}
	}
	
	this.bpFiles = bpHelpers.prepareFiles(globby.sync([
		`${currentBpPath}/**`
	]), `${currentBpPath}`);
};