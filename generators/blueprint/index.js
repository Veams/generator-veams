'use strict';
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var helpers = require('../../lib/helpers');
var generatorBlueprint = require('../../generator-files/generator-blueprint.js');
var configFile = require('../../lib/config');

module.exports = yeoman.generators.Base.extend({

	// Initialize general settings and store some files
	initializing: function () {
		this.config.defaults(configFile.setup.empty);
	},

	// Custom prompts routine
	prompting: function () {
		var cb = this.async();
		var prompts = [];

		this.log(
			('\n') + chalk.bgCyan('Create a new blueprint based on Veams.') + ('\n')
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
	 * Grunt modules file generation
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
