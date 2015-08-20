'use strict';
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var pg = require('../../lib/pg-helpers');
var subGeneratorJS = require('../../generator-files/sub-generator-js.js');

module.exports = yeoman.generators.Base.extend({

	// note: arguments and options should be defined in the constructor.
	constructor: function () {
		yeoman.generators.Base.apply(this, arguments);
		subGeneratorJS.construct.call(this, 'Collection');
	},

// Custom prompts routine
	prompting: function () {
		var cb = this.async();

		console.log(
			('\n') + chalk.bgCyan('Generate your JS Collection with/out ES6 syntax.') + ('\n')
		);

		var prompts = [
			{
				name: "srcPath",
				message: "Where do you have your source files?",
				default: "resources"
			},
			{
				name: 'path',
				message: 'Where would you like to place your Collection? root -> js/'
			},
			{
				name: 'initName',
				message: 'What do you want to name your Collection?',
				default: 'Data'
			}
		];

		this.prompt(prompts, function (props) {
			this.initName = props.initName;
			this.collection = props.collection;
			this.srcPath = pg.cleanupPath(props.srcPath);
			this.path = pg.cleanupPath(props.path);

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
