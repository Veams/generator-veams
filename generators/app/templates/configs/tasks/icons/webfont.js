/**
 * Generic task to generate a webfont out of icons.
 */

// Standard libs
const webfontsGenerator = require('webfonts-generator');
const globby = require('globby');
const chalk = require('chalk');

// Configs & Helpers
const veamsConfig = require('../../../veams-cli.json');
const helpers = require('../../utils/helpers');
const { types, dest } = require('./icons.config');

/**
 * Generate Webfont
 *
 * @param {Array} iconFiles - SVG files in array.
 */
function generateWebfont(iconFiles) {
	webfontsGenerator({
		files: iconFiles,
		cssDest: dest,
		cssTemplate: `${__dirname}/templates/webfont-scss.hbs`,
		cssFontsUrl: `../fonts/`,
		dest: `${dest}`,
		writeFiles: false
	}, (error, results) => {
		if (error) {
			console.error(chalk.red('Webfont Generation Error :: Generating Font:\n', error));
			return;
		}

		return handleOutputFiles(results);
	});
}

/**
 * Handle the writing manually to split up the destination paths.
 *
 * @param {Object} result - Complete object which contains fonts and css.
 */
function handleOutputFiles(result) {
	for (let i = 0; i < types.length; i++) {
		helpers.write(`${veamsConfig.paths.assets}/fonts/iconfont.${types[ i ]}`, result[ types[ i ] ]);
	}

	return helpers.write(`${dest}/webfont.scss`, result.generateCss());
}

/**
 * Get all icon files and execute `generateWebfont()`
 */
globby(`${veamsConfig.paths.assets}/icons/svg/**/*.svg`)
	.then(files => generateWebfont(files))
	.then(() => console.log(chalk.green('Webfont and SCSS files successfully generated!')))
	.catch(err => console.log(chalk.red('Webfont Generation Error: Globbing:\n', err)));