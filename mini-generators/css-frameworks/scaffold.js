const config = require('./config');

module.exports = function scaffold() {
	// Delete CSS packages
	if (this.cssLibs.indexOf(config.foundationId) == -1) delete this.pkgFile['devDependencies']['foundation-sites'];
	if (this.cssLibs.indexOf(config.includeMediaId) == -1) delete this.pkgFile['devDependencies']['include-media'];
	if (this.cssLibs.indexOf(config.bootstrapId) == -1) delete this.pkgFile['dependencies']['bootstrap-sass'];
	if (this.cssLibs.indexOf(config.neatId) == -1) {
		delete this.pkgFile['devDependencies']['bourbon-neat'];
		delete this.pkgFile['devDependencies']['neat'];
	}

	// Grunt handling
	if (this.cssLibs.indexOf(config.lostGridId) != -1) {
		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.fs.copyTpl(
				this.templatePath(this.generatorGruntPath + 'postcss.js.ejs'),
				this.gruntPath + 'postcss.js',
				this
			);
		} else {
			delete this.pkgFile['devDependencies']['grunt-postcss'];
		}
	} else {
		delete this.pkgFile['devDependencies']['lost'];
	}
};