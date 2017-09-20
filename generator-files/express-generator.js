'use strict';

exports.questions = function () {
	return {};
};

exports.setup = function () {};

exports.scaffold = function () {

	/**
	 * Server
	 */
	this.fs.copy(
		this.templatePath('server/configs'),
		'server/configs'
	);

	this.fs.copy(
		this.templatePath('server/routes'),
		'server/routes'
	);

	this.fs.copy(
		this.templatePath('server/index.js'),
		'server/index.js'
	);

	this.fs.copyTpl(
		this.templatePath('server/modules/express.js.ejs'),
		'server/modules/express.js',
		this
	);

	if (this.templateEngine.indexOf('mangony') !== -1) {
		this.fs.copy(
			this.templatePath('server/modules/mangony.js'),
			'server/modules/mangony.js'
		);
	}

	/**
	 * Config files
	 */
	this.fs.copy(
		this.templatePath('babelrc'),
		'.babelrc'
	);

	this.fs.copy(
		this.templatePath(this.generatorHelperPath + 'tasks/nodemon.config.json'),
		this.helperPath + 'tasks/nodemon.config.json'
	);
};