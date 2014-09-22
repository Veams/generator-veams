'use strict';
var util = require('util');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

var ComponentsGenerator = module.exports = function ComponentsGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.Base.apply(this, arguments);

};

util.inherits(ComponentsGenerator, yeoman.generators.NamedBase);

ComponentsGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	console.log(
		('\n') + chalk.bgMagenta('Install Components and Modules') + ('\n')
	);

	var questions = [];

	questions.push({
		name: "components",
		type: "checkbox",
		message: "Which components and/or modules do you want to add to your project?",
		choices: [
			{
				name: "Base Components",
				value: "base-components"
			},
			{
				name: "Form Component",
				value: "form-component"
			}
		],
		default: this.config.get("components")
	});


	this.prompt(questions, function (answers) {
		this.components = answers.components;

		//save config to .yo-rc.json
		this.config.set(answers);

		cb();
	}.bind(this));

};

/**
 * Components file generation
 *
 */
ComponentsGenerator.prototype.appComponents = function appComponents() {
	if (this.components && this.components.length > 0) {
		if (this.components.indexOf('base-components') != -1) {
			this.directory('../../app/templates/resources/templates/partials/components/_base', 'resources/templates/partials/components/');
		}
		if (this.components.indexOf('form-component') != -1) {
			this.directory('../../app/templates/resources/templates/partials/components/form', 'resources/templates/partials/components/form');
			this.directory('../../app/templates/resources/data/pages/forms', 'resources/data/pages/forms');
		}
	}
};