'use strict';

exports.questions = function () {
	return {};
};

exports.setup = function () {};

exports.scaffold = function () {
	this.fs.copyTpl(
		this.templatePath('server/index.js.ejs'),
		'server/index.js',
		this
	);

	this.fs.copyTpl(
		this.templatePath(this.generatorHelperPath + 'tasks/nodemon.config.json'),
		this.helperPath + 'tasks/nodemon.config.json'
	);
};