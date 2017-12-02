/**
 * Generate Data-URI stylesheets with grunticon.
 */

	// Generic libs
const Grunticon = require('grunticon-lib');
const globby = require('globby');
const chalk = require('chalk');

// Helpers & Config Files
const helpers = require('../../utils/helpers');
const veamsConfig = require('../../../veams-cli.json');
const iconConfig = require('./icons.config');

// Grunticon Options
const opts = {
	// optional grunticon paths properties
	// SVGO compression, false is the default, true will make it so
	svgo: true,

	// PNG compression, false is the default, true will make it so
	pngcrush: false,

	// CSS filenames
	datasvgcss: "icons-data-svg.scss",
	datapngcss: "icons-data-png.scss",
	urlpngcss: "icons-data-fallback.scss",

	// grunticon loader code snippet filename
	// loadersnippet: "grunticon.loader.js

	// folder name (within dest) for png output
	pngfolder: "../../../assets/icons/png-fallback/",

	// prefix for CSS classnames
	cssprefix: "%icon-",

	// css file path prefix - this defaults to "/" and will be placed before the "dest" path when stylesheets are
	// loaded. This allows root-relative referencing of the CSS. If you don't want a prefix path, set to to ""
	cssbasepath: "/"
};

/**
 * Generation Task
 */

globby(`${veamsConfig.paths.assets}/icons/**/*.svg`)
	.then(files => generateGrunticons(files))
	.then(() => {
		const removedFiles = [];

		console.log(chalk.green('Grunticon :: Generation of files successful!\n') +
			chalk.yellow('Starting with clean up ...'));

		removedFiles.push(helpers.remove(`${iconConfig.dest}/icons-data-fallback.scss`));
		removedFiles.push(helpers.remove(`${iconConfig.dest}/grunticon.loader.js`));
		removedFiles.push(helpers.remove(`${iconConfig.dest}/preview.html`));

		return Promise.all(removedFiles);
	})
	.then(data => console.log(chalk.green(`Grunticon :: Clean up successful, files ${chalk.cyan(data.join(', '))} deleted!`)))
	.catch(err => console.log(chalk.red('Grunticon :: Error\n', err)));

/**
 * Grunticon promisified
 */
function generateGrunticons(files) {
	const grunticon = new Grunticon(files, `${iconConfig.dest}`, opts);

	return new Promise((resolve, reject) => {
		grunticon.process(() => resolve());
	});
}
