/**
 * Represents a helper to support wrapper partials.
 *
 * @author Sebastian Fitzner
 */
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var config = require('../../../helpers/config');
var Alias = require('./alias');

module.exports.register = function (Handlebars, options) {

	var panelsDir = path.join(process.cwd(), config.options.paths.partials, '/**/*.hbs');
	var panels = getFiles(panelsDir);
	var aliases = [
		'area',
		'component',
		'factory',
		'panel'
	];

	/*
	 * wrapWith helper.
	 *
	 * @return content with defined markup in panel
	 */
	Handlebars.registerHelper('wrapWith', function (name, options) {
		if ('string' !== typeof name) {
			options = name;
			name = 'default';
		}

		var filename = name + '.hbs';
		// var filepath = path.join(process.cwd(), config.options.paths.panels, filename);
		var filepath = getPanel(panels, filename);

		var layout = fs.readFileSync(filepath).toString();
		var content = options.fn(this);
		var template = Handlebars.compile(layout);

		this.options = options.hash;
		this.yield = content;
		return template(this);
	});

	aliases.forEach(function (alias) {
		Alias.create(alias, Handlebars.helpers.wrapWith, Handlebars);
	});

};

function getFiles(path) {
	var paths = glob.sync(path);
	var panels = [];

	paths.forEach(function (file) {
		panels.push(file);
	});

	return panels;
}

function getPanel(panels, id) {
	var filepath;

	panels.forEach(function (file) {
		var cleanFile = file.substr(file.lastIndexOf('/') + 1);
		if (cleanFile == id) {
			filepath = file;
		}
	});

	return filepath;
}