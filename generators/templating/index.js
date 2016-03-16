'use strict';
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var hbsHelpersGenerator = require('../../generator-files/hbs-helpers-generator');
var configFile = require('../../lib/config');

module.exports = yeoman.generators.Base.extend({
	// Initialize general settings and store some files
	initializing: function () {
		this.bindEvents();
	},

	bindEvents: function () {
		var _this = this;

		this.on(configFile.events.end, function () {
			hbsHelpersGenerator.postInstall.call(_this);
		});
	},

	prompting: function () {
		var cb = this.async();

		this.log(
			('\n') + chalk.bgMagenta('Install Template Helpers') + ('\n')
		);

		var questions = [];

		questions = questions.concat(
			hbsHelpersGenerator.questions.call(this)
		);

		this.prompt(questions, function (props) {
			hbsHelpersGenerator.prompts.call(this, props);
			cb();
		}.bind(this));
	},

	writing: {
		setup: function () {
			hbsHelpersGenerator.setup.call(this);
		},
		scaffold: function () {
			hbsHelpersGenerator.scaffold.call(this);
		}
	}
});