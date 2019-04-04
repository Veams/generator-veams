'use strict';

const serverConfig = require('./config');

module.exports = function scaffold() {
	/**
	 * Config files
	 */
	this.fs.copy(
		this.templatePath(this.generatorHelperPath + 'tasks/nodemon.config.json'),
		this.destinationPath(this.helperPath + 'tasks/nodemon.config.json')
	);

	/**
	 * Server
	 */
	this.fs.copy(
		this.templatePath('src/server/api'),
		this.destinationPath('src/server/api')
	);

	this.fs.copy(
		this.templatePath('gitkeep'),
		this.destinationPath('src/server/mocks/.gitkeep')
	);

	this.fs.copy(
		this.templatePath('src/server/configs'),
		this.destinationPath('src/server/configs')
	);

	this.fs.copy(
		this.templatePath('src/server/models'),
		this.destinationPath('src/server/models')
	);

	this.fs.copy(
		this.templatePath('src/server/services'),
		this.destinationPath('src/server/services')
	);

	this.fs.copy(
		this.templatePath('src/server/utils'),
		this.destinationPath('src/server/utils')
	);

	this.fs.copy(
		this.templatePath('src/server/index.js'),
		this.destinationPath('src/server/index.js')
	);

	this.fs.copyTpl(
		this.templatePath('src/server/modules/express.js.ejs'),
		this.destinationPath('src/server/modules/express.js'),
		this
	);

	this.fs.copyTpl(
		this.templatePath('src/server/modules/reload.js'),
		this.destinationPath('src/server/modules/reload.js'),
		this
	);

	this.fs.copyTpl(
		this.templatePath('src/server/content/home.js.ejs'),
		this.destinationPath('src/server/content/home.js'),
		this
	);

	this.fs.copyTpl(
		this.templatePath('src/server/content/index.js.ejs'),
		this.destinationPath('src/server/content/index.js'),
		this
	);

	this.fs.copy(
		this.templatePath('src/server/content/server-hosts.js'),
		this.destinationPath('src/server/content/server-hosts.js')
	);

	/**
	 * Server features
	 */
	if (this.server.indexOf(serverConfig.serverFakeId) !== -1) {
		this.fs.copy(
			this.templatePath(`${this.generatorHelperPath}tasks/faker/faker.js`),
			this.destinationPath(this.helperPath + 'tasks/faker/faker.js')
		);

		this.fs.copy(
			this.templatePath(`${this.generatorHelperPath}tasks/faker/presets/example.preset.js`),
			this.destinationPath(this.helperPath + 'tasks/faker/presets/example.preset.js')
		);

		this.pkgFile[ 'scripts' ][ 'faker' ] = 'node configs/tasks/faker/faker.js';
	} else {
		delete this.pkgFile['devDependencies']['faker'];
	}

	/**
	 * Server Templating Module
	 */
	if (this.templateEngine === 'ssr-mangony-hbs') {
		// this.fs.copy(
		// 	this.templatePath('src/server/modules/mangony.js'),
		// 	'src/server/modules/mangony.js'
		// );
	}
};
