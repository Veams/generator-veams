require('babel-register');
const express = require('./modules/express');
const router = require('./content/index');
const apiRouter = require('./api/index');
const config = require('./configs/config');
const winston = require('winston');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {colorize: true});

const server = express(router, apiRouter);

setImmediate(() => {
	server.listen(config.port, config.ip, () => {
		winston.log('info', `Express server listening on http://${config.ip}:${config.port}, in ${config.env} environment.\n`)
	});
});