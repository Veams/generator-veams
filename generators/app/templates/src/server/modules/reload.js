const browserSync = require('browser-sync');
const veamsConfig = require('../../../veams-cli.json');

const bs = browserSync.create().init({
	proxy: 'localhost:' + veamsConfig.ports.server,
	port: veamsConfig.ports.app,
	notify: false,
	logSnippet: false,
	open: false,
	files: [
		veamsConfig.paths.app + '/**/*.*'
	]
});

module.exports = function () {
	return require('connect-browser-sync')(bs);
};