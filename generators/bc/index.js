'use strict';
var util = require('util');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

var BCGenerator = module.exports = function BCGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.Base.apply(this, arguments);

};

util.inherits(BCGenerator, yeoman.generators.NamedBase);

BCGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	console.log(
        ('\n') + chalk.bgCyan('Generate your Backbone Collection') +('\n')
    );

	var prompts = [{
		name: 'initName',
		message: 'What do you want to name your Collection?',
		default: 'Data'
	}, {
		name: 'path',
		message: 'Where would you like to place your Collection? root -> resources/js/collection/',
		default: ''
	}];

	this.prompt(prompts, function (props) {
		this.initName = props.initName;
		this.collection = props.collection;
		this.path = props.path;
		if (this.path !== '') {
			this.path = this.path.replace(/\/?$/, '/');
		}

		cb();
	}.bind(this));
};


BCGenerator.prototype.placeCollection = function placeCollection() {
		this.template('_Collection.js', 'resources/js/collections/' + this.path + this.initName + 'Collection.js');
};
