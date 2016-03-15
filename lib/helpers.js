'use strict';
var chalk = require('chalk');
var fsx = require('fs-extra');
var config = require('./config');

/**
 * Helper utilities
 */
var helpers = module.exports;
var marker = '\n***************************************************\n';

helpers.welcome = '' +
	chalk.cyan('\n.##.....##.########....###....##.....##..######.') +
	chalk.cyan('\n.##.....##.##.........##.##...###...###.##....##') +
	chalk.cyan('\n.##.....##.##........##...##..####.####.##......') +
	chalk.cyan('\n.##.....##.######...##.....##.##.###.##..######.') +
	chalk.cyan('\n..##...##..##.......#########.##.....##.......##') +
	chalk.cyan('\n...##.##...##.......##.....##.##.....##.##....##') +
	chalk.cyan('\n....###....########.##.....##.##.....##..######.') +
	chalk.cyan('\n................................................') +
	chalk.cyan('\n...............http://veams.org.................') +
	chalk.yellow('\n\n Welcome ladies and gentlemen!') +
	chalk.yellow('\nWant to make your life easy???') +
	chalk.red('\n\nBe sure you have installed') +
	chalk.red('\n* bower:  http://bower.io/') +
	chalk.red('\n* grunt:  http://gruntjs.com\n\n');

helpers.cleanupPath = function (path) {
	if (path !== '') {
		return path.replace(/\/?$/, '/');
	}
};

helpers.definePaths = function () {
	this.generatorHelperPath = '../../' + config.paths.appPath + config.paths.helperPath;
	this.generatorGruntPath = '../../' + config.paths.appPath + config.paths.gruntPath;
	this.generatorGulpPath = '../../' + config.paths.appPath + config.paths.gulpPath;
	this.generatorSrcPath = '../../' + config.paths.appPath + config.paths.srcPath;

	this.helperPath = this.helperPath || config.paths.helperPath;
	this.gruntPath = this.gruntPath || config.paths.gruntPath;
	this.gulpPath = this.gulpPath || config.paths.gulpPath;
	this.srcPath = this.srcPath || config.paths.srcPath;

	this.helperPath = helpers.cleanupPath(this.helperPath);
	this.gruntPath = helpers.cleanupPath(this.gruntPath);
	this.gulpPath = helpers.cleanupPath(this.gulpPath);
	this.srcPath = helpers.cleanupPath(this.srcPath);
};

helpers.toCamelCase = function (str) {
	// Lower cases the string
	return str.toLowerCase()
		// Replaces any - or _ characters with a space
		.replace(/[-_]+/g, ' ')
		// Removes any non alphanumeric characters
		.replace(/[^\w\s]/g, '')
		// Uppercases the first character in each group immediately following a space
		// (delimited by spaces)
		.replace(/ (.)/g, function ($1) {
			return $1.toUpperCase();
		})
		// Removes spaces
		.replace(/ /g, '');
};

helpers.hyphenate = function (str) {
	return str.replace(/\s/g, "-").toLowerCase();
};

helpers.capitalizeFirstLetter = function (str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Log messages to the console.
 *
 * @param {String} color - Define the color of message (see chalk.js).
 * @param {String} msg - Message which will be displayed.
 */
helpers.message = function (color, msg) {
	console.log(
		chalk[color](marker) +
		chalk[color](msg) +
		chalk[color](marker)
	);
};

helpers.getProjectConfig = function () {
	try {
		var configFile = helpers.getConfigFile();
		var config = require(process.cwd() + '/' + configFile);
	} catch (error) {
		helpers.message('yellow', 'No configFile found: ' + error);
	}

	return config;
};

helpers.getConfigFile = function () {
	return JSON.parse(fsx.readFileSync(process.cwd() + '/package.json', 'utf-8')).veams.configFile;
};

helpers.getExtension = function (filename) {
	// console.log('filename: ', filename.split().pop());
	return filename.split('.').pop();
};