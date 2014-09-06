module.exports = {
	options: {
		paths: {
			spriteElements: "<%= paths.src %>/assets/img/svg",
			sprites: "<%= paths.src %>/assets/img/sprites",
			css: "<%= paths.src %>/scss/icons"
		},
		sizes: {
			large: 125,
			medium: 100,
			small: 50
		},
		refSize: "medium",
		unit: 5,
		cssSuffix: "scss",
		prefix: "sprite"
	}
};