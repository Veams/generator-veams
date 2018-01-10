const veamsConfig = require('./veams-cli.json');

/**
 * Mapping
 */
const devMaps = [
	'dev',
	'local',
	'qa'
];

const configFile = devMaps.indexOf(process.env.NODE_ENV) !== -1 ? 'dev' : process.env.NODE_ENV;

/**
 * Return specific config file
 */
module.exports = function () {
	return require(`./${veamsConfig.paths.config}/webpack.${configFile}.js`);
};