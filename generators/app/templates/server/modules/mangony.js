const deepExtend = require('deep-extend');
const Mangony = require('mangony');
const mangonyOptions = require('../../configs/tasks/mangony.config');

module.exports = (express) => {
	const mangonyDevOptions = deepExtend(mangonyOptions.dev.options, {
		devServer: {
			express: express
		}
	});

	return new Mangony(deepExtend(mangonyOptions.options, mangonyDevOptions));
};