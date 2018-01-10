const veamsConfig = require('./veams-cli.json');

/**
 * Mapping
 */
const devMaps = [
	'dev',
	'local',
	'qa',
	'production'
];

/**
 * Get right config file, default is common
 */
const configFile = devMaps.indexOf(process.env.NODE_ENV) !== -1 ? 'common' : process.env.NODE_ENV;

/**
 * Return specific config file,
 * default is 'webpack.common.js'
 */
module.exports = function () {
	return require(`./${veamsConfig.paths.config}/tasks/_webpack/webpack.${configFile}.js`);
};