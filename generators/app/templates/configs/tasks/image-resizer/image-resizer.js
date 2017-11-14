const generateResponsiveImages = require('responsive-images-generator/lib').generateResponsiveImages;
const path = require('path');
const globby = require('globby');
const chalk = require('chalk');
const veamsConfig = require('../../../veams-cli.json');
const defaultPreset = require('./presets/default-preset');

/**
 * Arguments
 */
const args = process.argv.splice(2);

if (args.length === 0) {
	console.error(chalk.red(`You have to provide an image file or a path as source! The following syntax can be used: 
	1. npm run images test.jpg
	2. npm run images test/*.jpg
	3. npm run images test.jpg preset=default
`));
	return;
}

const imagePaths = `${veamsConfig.paths.src}/assets/img/${args[0]}`;
const preset = args[1] ? require(`./presets/${args[1].split('=').pop()}`) : defaultPreset;

globby(imagePaths)
	.then(images => generateResponsiveImages(images, preset, {
		skipOnEnlargement: false,
		withoutEnlargement: false
	}))
	.then(() => console.log(chalk.green('Images successfully generated!')));