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

	(!this.config.get("installComponents") || force) && questions.push({
		type: "confirm",
		name: "installComponents",
		message: "Do you want to install components?",
		default: this.config.get("installComponents")
	});
	questions.push({
		name: "components",
		type: "checkbox",
		message: "Which assemble components do you want to use?",
		choices: [
			{
				name: "Base Components",
				value: "componentBase"
			},
			{
				name: "Form Component",
				value: "componentForm"
			}
		],
		when: function (answers) {
			return answers.installComponents;
		}
	});

	(!this.config.get("installModules") || force) && questions.push({
		type: "confirm",
		name: "installModules",
		message: "Do you want to install js modules?",
		default: this.config.get("installModules")
	});

	questions.push({
		name: "setJS",
		type: "list",
		message: "Do you want to use jQuery or BackboneJS?",
		choices: [
			{
				name: "jQuery (and jQueryUI)",
				value: "jquery"
			},
			{
				name: "BackboneJS (and RequireJS)",
				value: "backbone"
			}
		],
		when: function (answers) {
			return answers.installModules;
		}
	});

	questions.push({
		name: "jsModules",
		type: "checkbox",
		message: "Which assemble components do you want to use?",
		choices: [
			{
				name: "Carousel Module",
				value: "moduleCarousel"
			}
		],
		when: function (answers) {
			return answers.installModules;
		}
	});


	this.prompt(questions, function (answers) {
		this.installComponents = answers.installComponents;
		this.components = answers.components;
		this.installModules = answers.installModules;
		this.setJS = answers.setJS;
		this.jsModules = answers.jsModules;

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

		if (this.components.indexOf('componentBase') != -1) {
			this.directory('components/article', 'resources/templates/partials/components/article');
			this.directory('components/figure', 'resources/templates/partials/components/figure');
			this.directory('components/picture', 'resources/templates/partials/components/picture');
			this.directory('components/video', 'resources/templates/partials/components/video');
		}

		if (this.components.indexOf('componentForm') != -1) {
			this.directory('components/form', 'resources/templates/partials/components/form');
			this.directory('pages/forms', 'resources/templates/pages/forms');
			this.directory('data/pages/forms', 'resources/data/pages/forms');
			this.copy('scss/components/_c-form.scss', 'resources/scss/components/_c-form.scss');
		}
	}
};

/**
 * Modules file generation
 *
 */
ComponentsGenerator.prototype.appModules = function appModules() {

	if (this.jsModules && this.jsModules.length > 0) {

		if (this.jsModules.indexOf('moduleCarousel') != -1) {
			this.directory('modules/carousel', 'resources/templates/partials/modules/carousel');
			this.directory('data/carousels/', 'resources/data/carousels/');
			this.copy('scss/modules/_m-carousel.scss', 'resources/scss/modules/_m-carousel.scss');

			if (this.setJS.indexOf('jquery') != -1) {
				this.copy('pages/jquery/carousel.hbs', 'resources/templates/pages/carousel.hbs');
				this.copy('js/jquery/modules/carousel/carousel.js', 'resources/js/modules/carousel.js');
				this.copy('js/jquery/modules/carousel/carouselPager.js', 'resources/js/modules/carouselPager.js');
			} else {
				this.copy('pages/backbone/carousel-bb.hbs', 'resources/templates/pages/carousel.hbs');
				this.directory('js/backbone/Carousel', 'resources/js/views/Carousel');
			}
		}
	}
};