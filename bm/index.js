'use strict';
var util = require('util');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

var BMGenerator = module.exports = function BMGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.Base.apply(this, arguments);

};

util.inherits(BMGenerator, yeoman.generators.NamedBase);

BMGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	console.log(
        ('\n') + chalk.bgMagenta('Generate your Backbone Model') +('\n')
    );

	var prompts = [{
		name: 'initName',
		message: 'What do you want to name your Model?',
		default: 'Data'
	}, {
		name: 'path',
		message: 'Where would you like to place your Model? root -> resources/js/models/',
		default: ''
	}, {
		type: 'confirm',
		name: 'collection',
		message: 'Would you like to initialize a Collection with your Model?',
		default: true
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

BMGenerator.prototype.placeModel = function placeModel() {
	this.template('_Model.js', 'resources/js/models/' + this.path + this.initName + 'Model.js');
};

BMGenerator.prototype.placeCollection = function placeCollection() {
	if (this.collection) {
		this.template('_Collection.js', 'resources/js/collections/' + this.path + this.initName + 'Collection.js');
	}
};
