'use strict';
var util = require('util');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

var BVGenerator = module.exports = function BVGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.Base.apply(this, arguments);

};

util.inherits(BVGenerator, yeoman.generators.NamedBase);

BVGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

    console.log(
        chalk.yellow(' \n Generate your Backbone View \n')
    );

	var prompts = [{
		name: 'initName',
		message: 'What do you want to name your View?',
		default: 'Product'
	}, {
		name: 'path',
		message: 'Where would you like to place your View? root -> resources/js/views/'
	}, {
		type: 'confirm',
		name: 'temp',
		message: 'Would you like to create a template with your View?',
		default: true
	}];

	this.prompt(prompts, function(props) {
		this.initName = props.initName;
		this.path = props.path;
		this.temp = props.temp;
		if (this.path !== '' ) {
			this.path = this.path.replace(/\/?$/, '/');
		}
		cb();
	}.bind(this));
};

BVGenerator.prototype.placeView = function placeView() {
	this.template('_View.js', 'resources/js/views/' + this.path + this.initName + 'View.js');
};

BVGenerator.prototype.placeTemplate = function placeTemplate() {
	if (this.temp) {
		this.template('_Template.html', 'resources/js/views/' + this.path + this.initName + '.html');
	}
};
