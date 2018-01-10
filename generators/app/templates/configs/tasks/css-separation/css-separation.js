const fs = require('fs');
const chalk = require('chalk');
const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');
const separator = require('postcss-separator');
const projectConfig = require('../../../veams-cli.json');

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
		name: 'output',
		alias: 'o',
		type: String
	},
	{
		name: 'help',
		alias: 'h',
		type: Boolean
	}
];

// Parsing options
const options = commandLineArgs(optionDefinitions);
options.config = options.config || `${projectConfig.paths.config}/tasks/css-separation/css-separation.config.js`;
options.input = options.input || `${projectConfig.paths.app}/css/app.bundle.css`;
options.output = options.output || `${projectConfig.paths.app}/css/data-uri.css`;

/**
 * Get pattern file
 */
const config = require(`${process.cwd()}/${options.config}`);
const configFile = fs.readFileSync(`${process.cwd()}/${options.config}`);

/**
 * Command Line Usage
 */

const sections = [
	{
		header: 'CSS Separation ',
		content: 'Split up your Data-URI (or anything else) into a separate CSS file.'
	},
	{
		header: 'Options ',
		optionList: [
			{
				name: 'config',
				typeLabel: '[underline]{filepath}',
				description: 'The config file with your pattern object in there.'
			},
			{
				name: 'input',
				typeLabel: '[underline]{filepath}',
				description: 'The input file you want to process.'
			},
			{
				name: 'output',
				typeLabel: '[underline]{filepath}',
				description: 'The output filepath where the separated data is saved to.'
			},
			{
				name: 'help',
				description: 'Print this usage guide.'
			}
		]
	},
	{
		header: 'Pattern file ',
		content: [
			chalk.bold('The pattern file looks like that:'),
			chalk.yellow(`${configFile}`),
			chalk.bold('You can simply create your own config file and provide it via --config option.')
		]
	}
];
const usage = getUsage(sections);

/**
 * Print usage
 */

if (options.help) {
	console.log(usage);
	return;
}


/**
 * Files
 */
const original = fs.readFileSync(`${process.cwd()}/${options.input}`, 'utf8');

/**
 * Separate files by using separator
 */
const icons = separator.separate(original, Object.assign(
	{ dataFile: true }, options.config
));
const cleanUp = separator.separate(original, Object.assign(
	{ dataFile: false }, options.config
));

/**
 * Write files to the file system.
 */
console.log(chalk.yellow('PostCSS Separator :: Start to write files to your filesystem ...'));

fs.writeFileSync(`${options.output}`, icons);
fs.writeFileSync(`${options.input}`, cleanUp);

console.log(chalk.green(`PostCSS Separator :: Files successfully created in ${chalk.cyan(projectConfig.paths.app + '/css')}.`));
