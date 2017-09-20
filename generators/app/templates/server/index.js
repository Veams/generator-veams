require('babel-register');
const express = require('./modules/express');
const router = require('./routes/router');
const config = require('./configs/config');
const winston = require('winston');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {colorize: true});

const server = express(router);

setImmediate(() => {
	server.listen(config.port, config.ip, () => {
		winston.log('info', 'Express server listening on http://%s:%d, in %s mode', config.ip, config.port, config.env)
	});
});
//
// // an example route for an API
// app.get('/test-express.json', function (req, res) {
// 	const responseObject = {
// 		works: true
// 	};
// 	res.send(JSON.stringify(responseObject, 4, null));
// });

/**
 * serves the static folders
 */

//
// app.listen(app.get('port'), function () {
// 	console.log('Express server started on port ' + app.get('port') + ' serving static files from ' + args[2] + ' folder.');
// });