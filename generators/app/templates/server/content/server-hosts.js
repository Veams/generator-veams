'use strict';
const request = require('request');
const express = require('express');
const router = express.Router();

/**
 * the keys of serverHosts are
 * used to implement the routing
 * localhost:[port]/veams is proxied
 * to https://github.com/Veams
 * @type {Object}
 */
const serverHosts = {
	'veams': 'https://github.com/Veams'
};

const serverHostRoutes = [];

Object.keys(serverHosts).forEach(function (route) {
	serverHostRoutes.push('/' + route);
	serverHostRoutes.push('/' + route + '.json');
});

router.get(serverHostRoutes, (req, res) => {
	let key, url;
	let format = '';

	key = req.originalUrl.substring(1, req.originalUrl.length);

	if (key.indexOf('.json') !== -1) {
		key = key.replace('.json', '');
		format = '.json';
	}

	url = serverHosts[key] + req.url + format;

	req.pipe(request(url)).pipe(res);
});

module.exports = router;
