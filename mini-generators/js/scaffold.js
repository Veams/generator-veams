import {reactId, veamsQueryId, jqueryId} from './config';

export default function scaffold() {
	if (this.jsLibs.indexOf(reactId) == -1) {
		delete this.pkgFile['dependencies']['react'];
	}

	if (this.jsLibs.indexOf(jqueryId) == -1) {
		delete this.pkgFile['dependencies']['jquery'];
	}

	if (this.jsLibs.indexOf(veamsQueryId) == -1) {
		delete this.pkgFile['dependencies']['veams-query'];
	}

	// Add JS files for libraries
	if (this.gruntModules.indexOf('grunt-browserify') !== -1) {
		this.fs.copyTpl(
			this.templatePath('src/_app.browserify.js.ejs'),
			'src/app.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath('src/core/scripts/_core.browserify.js.ejs'),
			'src/core/scripts/core.js',
			this
		);
	}
};