/**
 * Generic task to generate a webfont out of icons.
 */

/**
 * Libraries
 */
const webfontsGenerator = require('webfonts-generator');
const globby = require('globby');
const chalk = require('chalk');
const fs = require('fs-extra');
const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');

// Configs & Helpers
const veamsConfig = require('../../../veams-cli.json');

/**
 * Command Line Usage
 */
const sections = [
	{
		header: 'Webfont Generation ',
		content: 'Create a webfont from an icons directory.'
	},
	{
		header: 'Options ',
		optionList: [
			{
				name: 'config',
				typeLabel: '[underline]{filepath}',
				description: 'The config file with your options object in there.'
			},
			{
				name: 'input',
				typeLabel: '[underline]{filepath}',
				description: 'The input directory you want to process.'
			},
			{
				name: 'types',
				typeLabel: '[underline]{Array}',
				description: 'Webfont types you want to generate.'
			},
			{
				name: 'fontsName',
				typeLabel: '[underline]{filename}',
				description: 'The output filename for your generated font.'
			},
			{
				name: 'dest',
				typeLabel: '[underline]{filepath}',
				description: 'The destination for your generated style file.'
			},
			{
				name: 'destFile',
				typeLabel: '[underline]{filepath}',
				description: 'The filename for your generated style file.'
			},
			{
				name: 'help',
				description: 'Print this usage guide.'
			}
		]
	}
];
const usage = getUsage(sections);

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
		name: 'input',
		alias: 'i',
		type: String
	},
	{
		name: 'types',
		alias: 't',
		multiple: true,
		type: String
	},
	{
		name: 'fontsPath',
		type: String
	},
	{
		name: 'fontsName',
		type: String
	},
	{
		name: 'dest',
		type: String
	},
	{
		name: 'destFile',
		type: String
	},
	{
		name: 'help',
		alias: 'h',
		type: Boolean
	}
];

// Parsing options
const cmdOptions = commandLineArgs(optionDefinitions);
cmdOptions.config = cmdOptions.config || `${veamsConfig.paths.config}/tasks/icons/webfont.config.js`;

/**
 * Print usage
 */
if (cmdOptions.help) {
	return console.log(usage);
}

/**
 * Get config file
 */
let defaultConfig = require(`${process.cwd()}/${cmdOptions.config}`);
const config = {
	...defaultConfig,
	destFile: cmdOptions.destFile || `${defaultConfig.destFile}`,
	fontsPath: cmdOptions.fontsPath || `${defaultConfig.fontsPath}`,
	fontsName: cmdOptions.fontsName || `${defaultConfig.fontsName}`,
	input: cmdOptions.input || `${defaultConfig.input}`,
	types: cmdOptions.types || `${defaultConfig.types}`,
	options: {
		...defaultConfig.pluginOptions,
		dest: cmdOptions.dest || `${defaultConfig.pluginOptions.dest}`
	}
};

/**
 * Generate Webfont
 *
 * @param {Array} iconFiles - SVG files in array.
 */
function generateWebfont(iconFiles) {
	webfontsGenerator(Object.assign({
		files: iconFiles
	}, config.pluginOptions), (error, results) => {
		if (error) {
			console.error(chalk.red('Webfont Generation Error :: Failed in generating the icons font.\n', error));
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
	for (let i = 0; i < config.types.length; i++) {
		fs.outputFileSync(`${config.fontsPath}/${config.fontsName}.${config.types[ i ]}`, result[ config.types[ i ] ]);
	}

	return fs.outputFileSync(`${config.pluginOptions.dest}/${config.destFile}`, result.generateCss());
}

/**
 * Get all icon files and execute `generateWebfont()`
 */
globby(config.input)
	.then(files => generateWebfont(files))
	.then(() => console.log(chalk.green('Webfont and SCSS files successfully generated!')))
	.catch(err => console.log(chalk.red('Webfont Generation Error :: Cannot read icons path.\n', err)));