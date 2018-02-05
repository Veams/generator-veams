import * as path from 'path';
const envConfig = require('../../../environments/environment.' + process.env.NODE_ENV);
const veamsConfig = require('../../../veams-cli');

const config = {
	veams: veamsConfig,
	env: process.env.NODE_ENV || 'development',
	ip: process.env.IP || '0.0.0.0',
	mockPath: 'mocks',
	port: process.env.PORT || veamsConfig.ports.server,
	root: path.join(__dirname, '..'),
	startPath: veamsConfig.startPath
};

module.exports = Object.assign(config, envConfig);