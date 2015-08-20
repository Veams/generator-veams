'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var pg = require('../../lib/pg-helpers');

module.exports = yeoman.generators.Base.extend({

	// note: arguments and options should be defined in the constructor.
	constructor: function () {
		yeoman.generators.Base.apply(this, arguments);

		// This method adds support for a `--coffee` flag
		this.option('amd');
		this.option('commonjs');

		// And you can then access it later on this way; e.g.
		// this.scriptSuffix = (this.options.coffee ? ".coffee" : ".js");
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
		setup: function(){
			this.tplFile = '_Collection.esh.js.ejs';

			if (this.options.amd) {
				this.tplFile ='_Collection.amd.js.ejs'
			}
			if (this.options.commonjs) {
				this.tplFile ='_Collection.common.js.ejs'
			}
		},

		placeCollection: function () {
			this.template(this.tplFile, this.srcPath + 'js/' + this.path + this.initName + 'Collection.js');
		}
	}
});
