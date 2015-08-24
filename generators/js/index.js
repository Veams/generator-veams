'use strict';
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var helpers = require('../../lib/helpers');
var subGeneratorJS = require('../../generator-files/sub-generator-js.js');

module.exports = yeoman.generators.Base.extend({

	// note: arguments and options should be defined in the constructor.
	constructor: function () {
		yeoman.generators.Base.apply(this, arguments);

		// This makes `type` a required argument.
		this.argument('type', {
			type: String,
			required: true
		});

		subGeneratorJS.construct.call(this, this.type);
	},

	// Custom prompts routine
	prompting: function () {
		var cb = this.async();
		var prompts = [];

		this.log(
			('\n') + chalk.bgCyan('Generate your JS ' + this.type + ' with/out ES Harmony syntax.') + ('\n')
		);

		prompts = prompts.concat(
			subGeneratorJS.questions.call(this)
		);

		this.prompt(prompts, function (props) {
			subGeneratorJS.save.call(this, props);
			cb();
		}.bind(this));
	},

	/**
	 * Grunt modules file generation
	 *
	 */
	writing: {
		setup: function () {
			subGeneratorJS.setup.call(this);
		},

		scaffold: function () {
			subGeneratorJS.scaffold.call(this);
		}
	}
});
