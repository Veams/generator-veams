const imageExport = require('image-size-export');
const chalk = require('chalk');
const veamsConfig = require('../../../veams-cli.json');
const imageConfig = require('./images.config');
const imagePaths = `${veamsConfig.paths.assets}/img/**/*.jpg`;
const destPath = `${veamsConfig.paths.assets}/img/images.json`;

imageExport.record({
	path: imagePaths,
	output: destPath,
	categorizeBy: 'folders',
	folderDepth: 1,
	breakpointDelimiter: imageConfig.suffix
}, () => {
	console.log(chalk.green(`Image data information saved to ` + chalk.cyan(`${destPath}`) + `!`));
});

