module.exports = {
	options: {
		baseUrl: "<%= paths.src %>/shared/scripts/",
		mainConfigFile: "<%= paths.src %>/shared/scripts/main.js",
		name: "../bower-components/almond/almond", // assumes a production build using almond
		include: ["main"],
		findNestedDependencies: true,
		logLevel: 0,
		wrapShim: true
	},
	dev: {
		options: {
			out: "<%= paths.dev %>/shared/scripts/main.js",
			optimize: "none", // no minification
			generateSourceMaps: true
		}
	},
	prod: {
		options: {
			out: "<%= paths.dev %>/shared/scripts/main.js"
		}
	}
};