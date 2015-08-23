module.exports = {
	unit: {
		configFile: './test/config/karma.conf.js',
			singleRun: false,
			autoWatch: true,
			browsers: ['Chrome']
	},
	continuous: {
		configFile: './test/config/karma.ci.conf.js',
			singleRun: true,
			browsers: ['PhantomJS']
	}
}
