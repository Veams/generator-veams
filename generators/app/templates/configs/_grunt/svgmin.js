module.exports = {
	options: {
		plugins: [
			{ cleanupAttrs: true },
			{ cleanupEnableBackground: true },
			{ cleanupIDs: true },
			{ cleanupNumericValues: true },
			{ collapseGroups: true },
			{ convertColors: true },
			{ convertPathData: true },
			{ convertShapeToPath: true },
			{ convertStyleToAttrs: true },
			{ convertTransform: true },
			{ mergePaths: true },
			{ moveElemsAttrsToGroup: true },
			{ moveGroupAttrsToElems: true },
			{ removeComments: true },
			{ removeDoctype: true },
			{ removeEditorsNSData: true },
			{ removeEmptyAttrs: true },
			{ removeEmptyContainers: true },
			{ removeEmptyText: true },
			{ removeHiddenElems: true },
			{ removeMetadata: true },
			{ removeNonInheritableGroupAttrs: true },
			{ removeRasterImages: true },
			{ removeTitle: true },
			{ removeUnknownsAndDefaults: true },
			{ removeUnusedNS: true },
			{ removeUselessStrokeAndFill: false },
			{ removeViewBox: false },
			{ removeXMLProcInst: false },
			{ sortAttrs: true },
			{ transformsWithOnePath: false }
		]
	},
	icons: {
		files: [
			{
				cwd: '<%= paths.src %>/assets/img/svg/icons',
				dest: '<%= paths.src %>/assets/img/svgmin/icons',
				expand: true,
				ext: '.svg',
				src: ['*.svg']
			}
		]
	}
};