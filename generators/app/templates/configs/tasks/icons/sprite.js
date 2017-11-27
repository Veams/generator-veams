const globby = require('globby');
const chalk = require('chalk');
const spritesGenerator = require('dr-svg-sprites');
const veamsConfig = require('../../../veams-cli.json');
const helpers = require('../../utils/helpers');
const { types, dest } = require('./icons.config');

/**
 * Sprites options object
 */
const options = {
	selector: function (filename, tokens) {
		let parts = [filename];

		if (tokens.prefix) {
			parts.unshift(tokens.prefix);
		}
		
		return parts.join('-');
	},
	template: `${__dirname}/templates/sprite.hbs`,
	spriteElementPath: `${veamsConfig.paths.assets}/icons/svg`,
	spritePath: `${veamsConfig.paths.assets}/icons/sprites`,
	cssPath: `${dest}`,
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

/**
 * Replace assets path in scss file.
 *
 * @param {String} content - SCSS file content.
 */
function replacePath(content) {
	return content.replace(/\.\.\/\.\.\/assets\//g, '');
}

/**
 * Generate sprite by using lib.
 *
 * @param {Object} options - Complete options object with filepath.
 * @param {Function} - Callback function which updates the paths in final content.
 */
spritesGenerator(options, () => {
	helpers.readFile(`${dest}/sprite.scss`)
		.then(data => helpers.write(`${dest}/sprite.scss`, replacePath(data)))
		.then(() => console.log(chalk.green('Sprite and SCSS file successfully generated!')))
		.catch(err => console.error(chalk.red('Sprites Generation Error :: Reading file:\n', err)));
});
