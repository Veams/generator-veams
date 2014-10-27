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
	var force = false;
	if (!this.config.existed) {
		force = true;
	}
	var questions = [];

	console.log(
		('\n') + chalk.bgMagenta('Install Components and Modules') + ('\n')
	);

	(!this.config.get("definePath") || force) && questions.push({
		type: "confirm",
		name: "definePath",
		message: "Do you want to customize your path?",
		default: this.config.get("definePath")
	});

	questions.push({
		name: "srcPath",
		message: "Where do you have your source files?",
		default: "resources",
		when: function (answers) {
			return answers.definePath;
		}
	});

	questions.push({
		name: "assemblePath",
		message: "Where do you have your assemble files in your source folder?",
		default: "templates",
		when: function (answers) {
			return answers.definePath;
		}
	});

	questions.push({
		name: "dataPath",
		message: "Where do you have your data files in your source folder?",
		default: "data",
		when: function (answers) {
			return answers.definePath;
		}
	});
	questions.push({
		name: "jsPath",
		message: "Where do you have your js files in your source folder?",
		default: "js",
		when: function (answers) {
			return answers.definePath;
		}
	});

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
		this.definePath = answers.definePath;

		this.srcPath = answers.srcPath;
		if (this.srcPath !== '') {
			this.srcPath = this.srcPath.replace(/\/?$/, '/');
		}
		this.assemblePath = answers.assemblePath;
		if (this.assemblePath !== '') {
			this.assemblePath = this.assemblePath.replace(/\/?$/, '/');
		}

		this.dataPath = answers.dataPath;
		if (this.dataPath !== '') {
			this.dataPath = this.dataPath.replace(/\/?$/, '/');
		}

		this.jsPath = answers.jsPath;
		if (this.jsPath !== '') {
			this.jsPath = this.jsPath.replace(/\/?$/, '/');
		}

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
			this.directory('components/article', this.srcPath + this.assemblePath + 'partials/components/article');
			this.directory('components/figure', this.srcPath + this.assemblePath + 'partials/components/figure');
			this.directory('components/picture', this.srcPath + this.assemblePath + 'partials/components/picture');
			this.directory('components/video', this.srcPath + this.assemblePath + 'partials/components/video');
		}

		if (this.components.indexOf('componentForm') != -1) {
			this.directory('components/form', this.srcPath + this.assemblePath + 'partials/components/form');
			this.directory('pages/forms', this.srcPath + this.assemblePath + 'pages/forms');
			this.directory('data/pages/forms', this.srcPath + this.dataPath + 'pages/forms');
			this.copy('scss/components/_c-form.scss', this.srcPath + 'scss/components/_c-form.scss');
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
			this.directory('modules/carousel', this.srcPath + this.assemblePath + 'partials/modules/carousel');
			this.directory('data/carousels/', this.srcPath + this.dataPath + 'carousels/');
			this.copy('scss/modules/_m-carousel.scss', this.srcPath + 'scss/modules/_m-carousel.scss');

			if (this.setJS.indexOf('jquery') != -1) {
				this.copy('pages/jquery/carousel.hbs', this.srcPath + this.assemblePath + 'pages/carousel.hbs');
				this.copy('js/jquery/modules/carousel/carousel.js', this.srcPath + this.jsPath + 'modules/carousel.js');
				this.copy('js/jquery/modules/carousel/carouselPager.js', this.srcPath + this.jsPath + 'modules/carouselPager.js');
			} else {
				this.copy('pages/backbone/carousel-bb.hbs', this.srcPath + this.assemblePath + 'pages/carousel.hbs');
				this.directory('js/backbone/Carousel', this.srcPath + this.jsPath + 'views/Carousel');
			}
		}
	}
};