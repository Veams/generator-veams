module.exports = {
	options: {
		// Override the command used to start the server.
		// (do not use 'coffee' here, the server will not be able to restart
		//  see below at opts for coffee-script support)
		cmd: process.argv[0],

		// Will turn into: `node OPT1 OPT2 ... OPTN path/to/server.js ARG1 ARG2 ... ARGN`
		// (e.g. opts: ['node_modules/coffee-script/bin/coffee'] will correctly parse coffee-script)
		opts: [ ],
		args: ['<%%= paths.dev %>'],

		// Setting to `false` will effectively just run `node path/to/server.js`
		background: true,

		// Called when the spawned server throws errors
		fallback: function() {},

		// Override node env's PORT
		port: '<%%= ports.app %>',

		// Override node env's NODE_ENV
		node_env: undefined,

		// Enable Node's --harmony flag
		harmony: true,

		// Consider the server to be "running" after an explicit delay (in milliseconds)
		// (e.g. when server has no initial output)
		delay: 0,

		// Regular expression that matches server output to indicate it is "running"
		output: ".+",

		// Set --debug (true | false | integer from 1024 to 65535, has precedence over breakOnFirstLine)
		debug: false,

		// Set --debug-brk (true | false | integer from 1024 to 65535)
		breakOnFirstLine: false,

		// Object with properties `out` and `err` both will take a path to a log file and
		// append the output of the server. Make sure the folders exist.
		logs: undefined
	},
	dev: {
		options: {
			script: './server/main.js'
		}
	}
};