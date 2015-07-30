'use strict';
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var hbsHelpersGenerator = require('../../generator-files/hbs-helpers-generator');

module.exports = yeoman.generators.Base.extend({
	prompting: function () {
		var cb = this.async();

		this.log(
			('\n') + chalk.bgMagenta('Install Assemble Helpers') + ('\n')
		);

		var questions = [];

		questions = questions.concat(
			hbsHelpersGenerator.questions.call(this)
		);

		this.prompt(questions, function (props) {
			this.helperPath = props.helperPath;
			this.assembleHelperFiles = props.assembleHelperFiles;

			//save config to .yo-rc.json
			this.config.set(props);
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