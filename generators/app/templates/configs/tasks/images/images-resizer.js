const generateResponsiveImages = require('responsive-images-generator/lib').generateResponsiveImages;
const path = require('path');
const globby = require('globby');
const chalk = require('chalk');
const veamsConfig = require('../../../veams-cli.json');
const fs = require('fs-extra');
const defaultPreset = require('./presets/default-preset');
const imageConfig = require('./images.config');

/**
 * Arguments
 */
const args = process.argv.splice(2);

if (args.length === 0) {
	console.error(chalk.red(`You have to provide an image file or a path as source! The following syntax can be used: 
	1. npm run images:generate "**/*.jpg"
	2. npm run images:generate "test.jpg"
	3. npm run images:generate "test/*.jpg"
	4. npm run images:generate "test.jpg" preset=default
`));
	return;
}

const imagePaths = `${veamsConfig.paths.assets}/img/${args[ 0 ]}`;
const preset = args[ 1 ] ? require(`./presets/${args[ 1 ].split('=').pop()}`) : defaultPreset;

globby(imagePaths)
	.then((images) => {
		let removed = images.map(image => image.includes(`${imageConfig.suffix}`) && fs.remove(image));

		console.log(chalk.yellow('Removing previous generated images ...'));

		return Promise.all(removed)
			.then(() => globby(imagePaths));
	})
	.then(images => generateResponsiveImages(images, preset, {
		skipOnEnlargement: false,
		withoutEnlargement: false
	}))
	.then(() => console.log(chalk.green('New images successfully generated!')));