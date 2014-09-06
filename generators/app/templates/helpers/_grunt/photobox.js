module.exports = {
	local: {
		options: {
			indexPath: '<%= paths.helper %>/results/photobox/',
			screenSizes: [ '320', '580', '768', '1024', '1280' ],
			urls: [
				'http://localhost:9000/index.html',
				'http://localhost:9000/subpage.html',
				'http://localhost:9000/sitemap.html'
			]
		}
	},
	dev: {
		options: {
			indexPath: '<%= paths.helper %>/results/photobox/',
			screenSizes: [ '320', '580', '768', '1024', '1280' ],
			urls: [
				''
			]
		}
	},
	prod: {
		options: {
			indexPath: '<%= paths.helper %>/results/photobox/',
			screenSizes: [ '320', '580', '768', '1024', '1280' ],
			urls: [
			]
		}
	}
};