module.exports = {
	icons: {
		files: [
			{
				expand: true,
				cwd: '<%= paths.src %>/assets/img/svg/icons',
				src: ['*.svg', '*.png'],
				dest: "<%= paths.src %>/scss/icons"
			}
		],
		options: {
			// optional grunticon paths properties
			// SVGO compression, false is the default, true will make it so
			svgo: true,

			// PNG compression, false is the default, true will make it so
			pngcrush: false,

			// CSS filenames
			datasvgcss: "_icons-data-svg.scss",
			datapngcss: "_icons-data-png.scss",
			urlpngcss: "_icons-fallback.scss",

			// grunticon loader code snippet filename
			// loadersnippet: "grunticon.loader.js

			// folder name (within dest) for png output
			pngfolder: "../../assets/img/png_icons/",

			// prefix for CSS classnames
			cssprefix: "%icon-",

			// css file path prefix - this defaults to "/" and will be placed before the "dest" path when stylesheets are loaded.
			// This allows root-relative referencing of the CSS. If you don't want a prefix path, set to to ""
			cssbasepath: "/"
		}
	}
};
