module.exports = {
	local: {
		options: {
			indexPath: '<%%= paths.dest %>/photobox/',
			screenSizes: [ '320', '568', '768', '1024', '1280' ],
			urls: [
				'http://0.0.0.0:<%%= ports.app %>/index.html'
			]
		}
	},
	dev: {
		options: {
			indexPath: '<%%= paths.dest %>/photobox/',
			screenSizes: [ '320', '568', '768', '1024', '1280' ],
			urls: [
				''
			]
		}
	},
	prod: {
		options: {
			indexPath: '<%%= paths.dest %>/photobox/',
			screenSizes: [ '320', '568', '768', '1024', '1280' ],
			urls: [
			]
		}
	}
};