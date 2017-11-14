module.exports = function scaffold() {
	if (this.images.indexOf('imgResponsive') !== -1) {
		this.fs.copy(
			this.templatePath('configs/tasks/image-resizer/image-resizer.js'),
			'configs/tasks/image-resizer/image-resizer.js'
		);
		this.fs.copy(
			this.templatePath('configs/tasks/image-resizer/presets/default-preset.js'),
			'configs/tasks/image-resizer/presets/default-preset.js'
		);

		this.pkgFile['scripts']['images'] = 'node configs/tasks/image-resizer/image-resizer.js';

	} else {
		delete this.pkgFile['devDependencies']['responsive-images-generator'];
	}
};