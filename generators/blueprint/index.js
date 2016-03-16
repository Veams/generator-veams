'use strict';
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var helpers = require('../../lib/helpers');
var generatorBlueprint = require('../../generator-files/generator-blueprint.js');
var configFile = require('../../lib/config');

module.exports = yeoman.generators.Base.extend({

	// note: arguments and options should be defined in the constructor.
	constructor: function () {
		yeoman.generators.Base.apply(this, arguments);

		generatorBlueprint.construct.call(this);
	},

	// Initialize general settings and store some files
	initializing: function () {
		this.config.defaults(configFile.setup.empty);
		this.bindEvents();
	},

	bindEvents: function () {
		var _this = this;

		this.on(configFile.events.end, function () {
			generatorBlueprint.postInstall.call(_this);
		});
	},

	// Custom prompts routine
	prompting: function () {
		var cb = this.async();
		var prompts = [];

		this.log(
			('\n') + chalk.bgCyan('Create a new blueprint based on Veams or your own templates.') + ('\n')
		);

		prompts = prompts.concat(
			generatorBlueprint.questions.call(this)
		);

		this.prompt(prompts, function (props) {
			generatorBlueprint.save.call(this, props);
			cb();
		}.bind(this));
	},

	/**
	 * File generation
	 *
	 */
	writing: {
		setup: function () {
			generatorBlueprint.setup.call(this);
		},

		scaffold: function () {
			generatorBlueprint.scaffold.call(this);
		}
	}
});
