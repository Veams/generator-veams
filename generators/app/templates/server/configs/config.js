const envConfig = require('../../configs/environments/environment.' + process.env.NODE_ENV);
const veamsConfig = require('../../veams-cli');

const config = {
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || veamsConfig.ports.app,
	ip: process.env.IP || '0.0.0.0',
};

module.exports = Object.assign(config, envConfig);