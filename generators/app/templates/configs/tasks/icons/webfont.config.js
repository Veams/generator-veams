const veamsConfig = require('../../../veams-cli.json');

module.exports = {
	types: [
		'svg', 'ttf', 'woff2', 'woff', 'eot'
	],
	fontsPath: `${veamsConfig.paths.assets}/fonts`,
	fontsName: 'iconfont',
	input: `${veamsConfig.paths.assets}/icons/svg/**/*.svg`,
	destFile: `webfont.scss`,
	pluginOptions: {
		cssDest: `${veamsConfig.paths.app}/shared/styles/icons/`,
		cssTemplate: `${__dirname}/templates/webfont-scss.hbs`,
		cssFontsUrl: `../fonts/`,
		dest: `${veamsConfig.paths.app}/shared/styles/icons/`,
		writeFiles: false
	}
};