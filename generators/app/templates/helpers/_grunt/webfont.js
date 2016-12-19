// Please make sure you have the same paths in iconbuilder.js

module.exports = {
	font_icons: {
		src: '<%= paths.src %>/assets/img/svg/icons/*.svg',
		dest: '<%= paths.tmp %>/fonts',
		normalize: true,
		options: {
			normalize: true,
			stylesheet: 'scss',
			fontFamilyName: 'icons-font',
			font: 'icons-font',
			htmlDemoTemplate: '<%= paths.helpers %>/templates/webfonts/template.html',
			destCss: '<%= paths.tmp %>/icons',
			templateOptions: {
				classPrefix: 'is-icon-'
			}
		}
	}
};
