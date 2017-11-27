const veamsConfig = require('../../../veams-cli.json');

module.exports = {
	types: [
		'svg', 'ttf', 'woff2', 'woff', 'eot'
	],
	dest: `${veamsConfig.paths.src}/shared/styles/icons/`
};