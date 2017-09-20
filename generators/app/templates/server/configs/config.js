import * as path from 'path';
const envConfig = require('../../configs/environments/environment.' + process.env.NODE_ENV);
const veamsConfig = require('../../veams-cli');

const config = {
	env: process.env.NODE_ENV || 'development',
	ip: process.env.IP || '0.0.0.0',
	mockPath: 'mocks',
	port: process.env.PORT || veamsConfig.ports.app,
	root: path.join(__dirname, '..'),
	startPath: veamsConfig.startPath
};

module.exports = Object.assign(config, envConfig);