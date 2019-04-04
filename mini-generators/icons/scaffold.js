const iconConfig = require('./config');
const config = require('../../lib/config');

module.exports = function scaffold() {
	/**
	 * General Config
	 */
	if (this.icons.indexOf(iconConfig.spriteId) !== -1 ||
		this.icons.indexOf(iconConfig.webfontId) !== -1 ||
		this.icons.indexOf(iconConfig.iconGrunticonId) !== -1
	) {
		this.fs.copyTpl(
			this.templatePath('src/app/shared/styles/icons/_icons.scss'),
			this.destinationPath('src/app/shared/styles/icons/_icons.scss'),
			this
		);
	}
	/**
	 * Sprite Generation
	 */
	if (this.icons.indexOf(iconConfig.spriteId) !== -1) {
		this.fs.copy(
			this.templatePath(`${config.paths.helperPath}/tasks/icons/sprite.config.js`),
			this.destinationPath(`${config.paths.helperPath}/tasks/icons/sprite.config.js`)
		);
		this.fs.copy(
			this.templatePath(`${config.paths.helperPath}/tasks/icons/sprite.js`),
			this.destinationPath(`${config.paths.helperPath}/tasks/icons/sprite.js`)
		);
		this.fs.copy(
			this.templatePath(`${config.paths.helperPath}/tasks/icons/templates/sprite.hbs`),
			this.destinationPath(`${config.paths.helperPath}/tasks/icons/templates/sprite.hbs`)
		);

		this.pkgFile[ 'scripts' ][ 'sprite:generate' ] = 'node configs/tasks/icons/sprite.js';

	} else {
		delete this.pkgFile[ 'devDependencies' ][ 'dr-svg-sprites' ];
	}

	/**
	 * Webfont Generation
	 */
	if (this.icons.indexOf(iconConfig.webfontId) !== -1) {
		this.fs.copy(
			this.templatePath(`${config.paths.helperPath}/tasks/icons/webfont.config.js`),
			this.destinationPath(`${config.paths.helperPath}/tasks/icons/webfont.config.js`)
		);
		this.fs.copy(
			this.templatePath(`${config.paths.helperPath}/tasks/icons/webfont.js`),
			this.destinationPath(`${config.paths.helperPath}/tasks/icons/webfont.js`)
		);
		this.fs.copy(
			this.templatePath(`${config.paths.helperPath}/tasks/icons/templates/webfont-scss.hbs`),
			this.destinationPath(`${config.paths.helperPath}/tasks/icons/templates/webfont-scss.hbs`)
		);

		this.pkgFile[ 'scripts' ][ 'webfont:generate' ] = 'node configs/tasks/icons/webfont.js';

	} else {
		delete this.pkgFile[ 'devDependencies' ][ 'webfonts-generator' ];
	}

	/**
	 * Grunticon Generation
	 */
	if (this.icons.indexOf(iconConfig.iconGrunticonId) !== -1) {
		this.fs.copy(
			this.templatePath(`${config.paths.helperPath}/tasks/icons/grunticon.config.js`),
			this.destinationPath(`${config.paths.helperPath}/tasks/icons/grunticon.config.js`)
		);
		this.fs.copy(
			this.templatePath(`${config.paths.helperPath}/tasks/icons/grunticon.js`),
			this.destinationPath(`${config.paths.helperPath}/tasks/icons/grunticon.js`)
		);
		this.pkgFile[ 'scripts' ][ 'grunticon:generate' ] = 'node configs/tasks/icons/grunticon.js';

	} else {
		delete this.pkgFile[ 'devDependencies' ][ 'grunticon-lib' ];
	}

};
