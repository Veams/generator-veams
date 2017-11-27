const iconConfig = require('./config');
const config = require('../../lib/config');

module.exports = function scaffold() {
	/**
	 * General Config
	 */
	if (this.icons === iconConfig.spriteId ||
		this.icons === iconConfig.webfontId
	) {
		this.fs.copy(
			this.templatePath(`${config.paths.helperPath}/tasks/icons/icons.config.js`),
			`${config.paths.helperPath}/tasks/icons/icons.config.js`
		);
	}
	/**
	 * Sprite Generation
	 */
	if (this.icons === iconConfig.spriteId) {
		this.fs.copy(
			this.templatePath(`${config.paths.helperPath}/tasks/icons/sprite.js`),
			`${config.paths.helperPath}/tasks/icons/sprite.js`
		);
		this.fs.copy(
			this.templatePath(`${config.paths.helperPath}/tasks/icons/templates/sprite.hbs`),
			`${config.paths.helperPath}/tasks/icons/templates/sprite.hbs`
		);

		this.pkgFile[ 'scripts' ][ 'sprite:generate' ] = 'node configs/tasks/icons/sprite.js';

	} else {
		delete this.pkgFile[ 'devDependencies' ][ 'dr-svg-sprites' ];
	}

	/**
	 * Webfont Generation
	 */
	if (this.icons === iconConfig.webfontId) {
		this.fs.copy(
			this.templatePath(`${config.paths.helperPath}/tasks/icons/webfont.js`),
			`${config.paths.helperPath}/tasks/icons/webfont.js`
		);
		this.fs.copy(
			this.templatePath(`${config.paths.helperPath}/tasks/icons/templates/webfont-scss.hbs`),
			`${config.paths.helperPath}/tasks/icons/templates/webfont-scss.hbs`
		);

		this.pkgFile[ 'scripts' ][ 'webfont:generate' ] = 'node configs/tasks/icons/webfont.js';

	} else {
		delete this.pkgFile[ 'devDependencies' ][ 'webfonts-generator' ];
	}

};