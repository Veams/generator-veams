/**
 * Libraries
 */
const globby = require('globby');
const chalk = require('chalk');
const fs = require('fs-extra');
const spritesGenerator = require('dr-svg-sprites');
const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');

/**
 * Project Configuration
 */
const veamsConfig = require('../../../veams-cli.json');

/**
 * Command line options
 */
const optionDefinitions = [
	{
		name: 'config',
		alias: 'c',
		type: String
	},
	{
		name: 'spriteElementPath',
		alias: 's',
		type: String
	},
	{
		name: 'spritePath',
		alias: 'p',
		type: String
	},
	{
		name: 'cssPath',
		type: String
	},
	{
		name: 'help',
		alias: 'h',
		type: Boolean
	}
];


/**
 * Command Line Usage
 */
const sections = [
	{
		header: 'SVG Sprite Generation ',
		content: 'Create SVG sprites with PNG fallbacks at needed sizes.'
	},
	{
		header: 'Options ',
		optionList: [
			{
				name: 'config',
				typeLabel: '[underline]{filepath}',
				description: `The config file with your options object in there.`
			},
			{
				name: 'spriteElementPath',
				typeLabel: '[underline]{filepath}',
				description: 'The directory where you have your icons in.'
			},
			{
				name: 'spritePath',
				typeLabel: '[underline]{filepath}',
				description: 'The output filepath where the generated sprite is saved to.'
			},
			{
				name: 'cssPath',
				typeLabel: '[underline]{filepath}',
				description: 'The output filepath where the generated (S)CSS file is saved to.'
			},
			{
				name: 'help',
				description: 'Print this usage guide.'
			}
		]
	},
	{
		header: 'You want to customize the configuration?',
		content: [
			'Just eject the specific config file for this task by executing',
			chalk.yellow(chalk.bold(`veams eject sprite:generate`)),
			`----------------------------------------------------------------`,
			'You can also eject the full source code',
			chalk.yellow(chalk.bold(`veams eject sprite:generate --full`))
		]
	}
];
const usage = getUsage(sections);

// Parsing options
const cmdOptions = commandLineArgs(optionDefinitions);
cmdOptions.config = cmdOptions.config || `${veamsConfig.paths.config}/tasks/icons/sprite.config.js`;

/**
 * Get config file
 */

let defaultConfig = require(`${process.cwd()}/${cmdOptions.config}`);
const config = {
	...defaultConfig,
	spriteElementPath: cmdOptions.spriteElementPath || `${defaultConfig.spriteElementPath}`,
	spritePath: cmdOptions.spritePath || `${defaultConfig.spritePath}`,
	cssPath: cmdOptions.cssPath || `${defaultConfig.cssPath}`
};

/**
 * Print usage
 */

if (cmdOptions.help) {
	return console.log(usage);
}

/**
 * Sprites options object merged with config.
 */
const spriteOptions = Object.assign(config, {
	selector: function (filename, tokens) {
		let parts = [ filename ];

		if (tokens.prefix) {
			parts.unshift(tokens.prefix);
		}

		return parts.join('-');
	}
});

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
spritesGenerator(spriteOptions, () => {
	fs.readFile(`${config.cssPath}/sprite.${config.cssSuffix}`, 'utf-8')
		.then(data => fs.outputFile(`${config.cssPath}/sprite.${config.cssSuffix}`, replacePath(data)))
		.then(() => console.log(chalk.green('Sprite and SCSS file successfully generated!')))
		.catch(err => console.error(chalk.red('Sprites Generation Error :: Error in reading file.\n', err)));
});
