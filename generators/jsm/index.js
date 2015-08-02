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
			('\n') + chalk.bgMagenta('Generate your JS Model') + ('\n')
		);

		var prompts = [{
			name: "srcPath",
			message: "Where do you have your JS files?",
			default: "resources/js"
		}, {
			name: 'path',
			message: 'Where would you like to place your Model?',
			default: 'models'
		}, {
			name: 'initName',
			message: 'What do you want to name your Model?',
			default: 'Data'
		}, {
			type: 'confirm',
			name: 'collection',
			message: 'Would you like to initialize a Collection with your Model?',
			default: true
		}];

		this.prompt(prompts, function (props) {
			this.initName = props.initName;
			this.collection = props.collection;
			this.srcPath = pg.cleanupPath(props.srcPath);
			this.path = pg.cleanupPath(props.path);

			cb();
		}.bind(this));
	},

	/**
	 * File generation
	 *
	 */
	writing: {
		placeModel: function () {
			this.template('_Model.js.ejs', this.srcPath + '/' + this.path + this.initName + 'Model.js');
		},
		placeCollection: function () {
			if (this.collection) {
				this.template('_Collection.js.ejs',  this.srcPath + '/' + this.path + this.initName + 'Collection.js');
			}
		}
	}
});
