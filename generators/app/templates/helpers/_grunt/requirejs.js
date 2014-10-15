module.exports = {
	options: {
		baseUrl: "<%= paths.src %>/js/",
		mainConfigFile: "<%= paths.src %>/js/main.js",
		name: "../bower-components/almond/almond", // assumes a production build using almond
		include: ["main"],
		findNestedDependencies: true,
		logLevel: 0,
		wrapShim: true
	},
	dev: {
		options: {
			out: "<%= paths.dev %>/js/development.js",
			optimize: "none", // no minification
			generateSourceMaps: true
		}
	},
	production: {
		options: {
			out: "<%= paths.dev %>/js/production.js"
		}
	}
};