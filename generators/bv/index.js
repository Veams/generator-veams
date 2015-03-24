'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var pg = require('../../lib/pg-helpers');

module.exports = yeoman.generators.Base.extend({

// Custom prompts routine
	prompting: function () {
		var cb = this.async();

		console.log(
			('\n') + chalk.bgGreen('Generate your Backbone View') + ('\n')
		);

		var prompts = [
			{
				name: "srcPath",
				message: "Where do you have your source files?",
				default: "resources"
			},
			{
				name: 'path',
				message: 'Where would you like to place your View? root -> js/'
			},
			{
				name: 'initName',
				message: 'What do you want to name your View?',
				default: 'product'
			}, {
				type: 'confirm',
				name: 'tpl',
				message: 'Would you like to create a template with your View?',
				default: false
			}
		];

		this.prompt(prompts, function (props) {
			this.initName = props.initName;
			this.srcPath = pg.cleanupPath(props.srcPath);
			this.path = pg.cleanupPath(props.path);
			this.tpl = props.tpl;

			cb();
		}.bind(this));
	},

	/**
	 * File generation
	 *
	 */
	writing: {
		placeView: function () {
			this.template('_View.js.ejs', this.srcPath + 'js/' + this.path + this.initName + 'View.js');
		},
		placeTpl: function () {
			if (this.tpl) {
				this.template('_Template.html', this.srcPath + 'js/' + this.path + this.initName + '.html');
			}
		}
	}
});