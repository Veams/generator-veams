const veamsConfig = require('../../../veams-cli.json');

module.exports = {
	input: `${veamsConfig.paths.assets}/icons/svg/**/*.svg`,
	dest: `${veamsConfig.paths.src}/shared/styles/icons`,
	pluginOptions: {
		// optional grunticon paths properties
		// SVGO compression, false is the default, true will make it so
		svgo: true,

		// PNG compression, false is the default, true will make it so
		pngcrush: false,

		// CSS filenames
		datasvgcss: "icons-data-svg.scss",
		datapngcss: "icons-data-png.scss",
		urlpngcss: "icons-data-fallback.scss",

		// grunticon loader code snippet filename
		// loadersnippet: "grunticon.loader.js

		// folder name (within dest) for png output
		pngfolder: "../../../assets/icons/png-fallback/",

		// prefix for CSS classnames
		cssprefix: "%icon-",

		// css file path prefix - this defaults to "/" and will be placed before the "dest" path when stylesheets are
		// loaded. This allows root-relative referencing of the CSS. If you don't want a prefix path, set to to ""
		cssbasepath: "/"
	}
};