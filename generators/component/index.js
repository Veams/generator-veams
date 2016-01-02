'use strict';
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var helpers = require('../../lib/helpers');
var generatorComponent = require('../../generator-files/generator-component.js');
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
			('\n') + chalk.bgCyan('Create a new component based on Veams.') + ('\n')
		);

		prompts = prompts.concat(
			generatorComponent.questions.call(this)
		);

		this.prompt(prompts, function (props) {
			generatorComponent.save.call(this, props);
			cb();
		}.bind(this));
	},

	/**
	 * Grunt modules file generation
	 *
	 */
	writing: {
		setup: function () {
			generatorComponent.setup.call(this);
		},

		scaffold: function () {
			generatorComponent.scaffold.call(this);
		}
	}
});
