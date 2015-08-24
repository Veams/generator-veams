module.exports = {
	options: {
		desiredCapabilities: {
			browserName: 'chrome'
		}
	},
	e2e: {
		tests: ['test/spec/e2e/**/*.js']
	},
	continuous: {
		options: {
			desiredCapabilities: {
				browserName: 'phantomjs'
			}
		},
		tests: ['test/spec/e2e/**/*.js']
	}
}