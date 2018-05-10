const veamsConfig = require('../../../veams-cli.json');

module.exports = {
	template: `${__dirname}/templates/sprite.hbs`,
	spriteElementPath: `${veamsConfig.paths.assets}/icons/svg`,
	spritePath: `${veamsConfig.paths.assets}/icons/sprites`,
	cssPath: `${veamsConfig.paths.app}/shared/styles/icons`,
	layout: 'packed',
	// cssSvgPrefix: 'svg',
	cssPngPrefix: 'no-svg',
	cssPrefix: '',
	prefix: 'sprites',
	sizes: {
		medium: 100
	},
	refSize: 'medium',
	unit: 5,
	cssSuffix: 'scss'
};