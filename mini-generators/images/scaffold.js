module.exports = function scaffold() {

	/**
	 * Image Generation
	 */
	if (this.images.indexOf('imgResponsive') !== -1 || this.images.indexOf('imgSizeExport') !== -1) {
		this.fs.copy(
			this.templatePath('configs/tasks/images/images.config.js'),
			this.destinationPath('configs/tasks/images/images.config.js')
		);
	}

	if (this.images.indexOf('imgResponsive') !== -1) {
		this.fs.copy(
			this.templatePath('configs/tasks/images/images-resizer.js'),
			this.destinationPath('configs/tasks/images/images-resizer.js')
		);
		this.fs.copy(
			this.templatePath('configs/tasks/images/presets/default-preset.js'),
			this.destinationPath('configs/tasks/images/presets/default-preset.js')
		);

		this.pkgFile[ 'scripts' ][ 'images:generate' ] = 'node configs/tasks/images/images-resizer.js';

	} else {
		delete this.pkgFile[ 'devDependencies' ][ 'responsive-images-generator' ];
	}

	if (this.images.indexOf('imgLazyLoad') === -1) delete this.pkgFile[ 'dependencies' ][ 'lazysizes' ];
	if (this.images.indexOf('imgPicturefill') === -1) delete this.pkgFile[ 'dependencies' ][ 'picturefill' ];

	if (this.images.indexOf('imgSizeExport') !== -1) {
		this.fs.copy(
			this.templatePath('configs/tasks/images/images-export.js'),
			this.destinationPath('configs/tasks/images/images-export.js')
		);

		this.pkgFile[ 'scripts' ][ 'images:export' ] = 'node configs/tasks/images/images-export.js';

	} else {
		delete this.pkgFile[ 'devDependencies' ][ 'image-size-export' ];
	}
};
