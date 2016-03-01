var express = require('express');
var request = require('request');
var livereload = require('connect-livereload');
var app = express();
/**
 * parameter passing from grunt
 * @type {Array}
 */
var args = process.argv;
/**
 * the keys of apiServerHosts are
 * used to implement the routing
 * localhost:[port]/veams is proxied
 * to https://github.com/Veams
 * @type {Object}
 */
var apiServerHosts = {
	'veams': 'https://github.com/Veams'
};

var apiServerHostRoutes = [];

Object.keys(apiServerHosts).forEach(function (route) {
	apiServerHostRoutes.push('/' + route);
	apiServerHostRoutes.push('/' + route + '.json');
});

app.set('port', process.env.PORT || 3000);

app.use(livereload({
	port: args[3]
}));

app.use(apiServerHostRoutes, function (req, res) {
	var key, url;
	var format = '';

	key = req.originalUrl.substring(1, req.originalUrl.length);

	if (key.indexOf('.json') !== -1) {
		key = key.replace('.json', '');
		format = '.json';
	}

	url = apiServerHosts[key] + req.url + format;

	req.pipe(request(url)).pipe(res);
});

// an example route for an API
app.get('/test-express.json', function (req, res) {
	var responseObject = {
		works: true
	};
	res.send(JSON.stringify(responseObject, 4, null));
});

/**
 * serves the static folders
 */
app.use(express.static(args[2]));

app.listen(app.get('port'), function () {
	console.log('Express server started on port ' + app.get('port') + ' serving static files from ' + args[2] + ' folder.');
});

module.exports = app;