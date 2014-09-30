module.exports = {
	icons: {
		options: {
			placeholder: "%",
			// template: "<%%= paths.helper %>/templates/sprites/stylesheet.hbs", // you can provide an own template
			spriteElementPath: <% if (modules && modules.length > 0) { if (modules.indexOf('grunt-svgmin') != -1) { %>'<%%= paths.src %>/assets/img/svgmin/icons'<% } else { %>'<%%= paths.src %>/assets/img/svg/icons'<% }} %>,
			spritePath: "<%%= paths.src %>/assets/img/sprites",
			cssPath: "<%%= paths.src %>/scss/icons",
			// cssSvgPrefix: "svg",
			cssPngPrefix: "lt-ie9",
			cssPrefix: "_sprites",
			prefix: "sprites",
			sizes: {
				medium: 100
			},
			refSize: "medium",
			unit: 5,
			cssSuffix: "scss"
		}
	}
};