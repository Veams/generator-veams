'use strict';
const request = require('request');
const express = require('express');
const router = express.Router();

/**
 * the keys of apiServerHosts are
 * used to implement the routing
 * localhost:[port]/veams is proxied
 * to https://github.com/Veams
 * @type {Object}
 */
const apiServerHosts = {
	'veams': 'https://github.com/Veams'
};

const apiServerHostRoutes = [];

Object.keys(apiServerHosts).forEach(function (route) {
	apiServerHostRoutes.push('/' + route);
	apiServerHostRoutes.push('/' + route + '.json');
});

router.get(apiServerHostRoutes, (req, res) => {
	let key, url;
	let format = '';

	key = req.originalUrl.substring(1, req.originalUrl.length);

	if (key.indexOf('.json') !== -1) {
		key = key.replace('.json', '');
		format = '.json';
	}

	url = apiServerHosts[key] + req.url + format;

	req.pipe(request(url)).pipe(res);
});

module.exports = router;
