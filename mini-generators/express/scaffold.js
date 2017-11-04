module.exports = function scaffold() {
	/**
	 * Config files
	 */
	this.fs.copy(
		this.templatePath(this.generatorHelperPath + 'tasks/nodemon.config.json'),
		this.helperPath + 'tasks/nodemon.config.json'
	);

	/**
	 * Server
	 */
	this.fs.copy(
		this.templatePath('server/api'),
		'server/api'
	);

	this.fs.copy(
		this.templatePath('server/configs'),
		'server/configs'
	);

	this.fs.copy(
		this.templatePath('server/models'),
		'server/models'
	);

	this.fs.copy(
		this.templatePath('server/services'),
		'server/services'
	);

	this.fs.copy(
		this.templatePath('server/utils'),
		'server/utils'
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

	this.fs.copyTpl(
		this.templatePath('server/content/home.js.ejs'),
		'server/content/home.js',
		this
	);

	this.fs.copyTpl(
		this.templatePath('server/content/index.js.ejs'),
		'server/content/index.js',
		this
	);

	this.fs.copy(
		this.templatePath('server/content/server-hosts.js'),
		'server/content/server-hosts.js'
	);

	if (this.templateEngine === 'ssr-mangony-hbs') {
		this.fs.copy(
			this.templatePath('server/modules/mangony.js'),
			'server/modules/mangony.js'
		);
	}
};