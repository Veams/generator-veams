module.exports = function scaffold() {
	if (this.cssPostProcessors.indexOf('cssNext') > -1) {
	} else {
		delete this.pkgFile[ 'devDependencies' ][ 'postcss-cssnext' ];
	}

	if (this.cssPostProcessors.indexOf('postCssSeparator') > -1) {
		this.pkgFile[ 'scripts' ][ 'css:separate' ] = 'node configs/tasks/css-separation/css-separation.js';
		this.fs.copy(
			this.templatePath('configs/tasks/css-separation/css-separation.js'),
			'configs/tasks/css-separation/css-separation.js'
		);
		this.fs.copy(
			this.templatePath('configs/tasks/css-separation/css-separation.config.js'),
			'configs/tasks/css-separation/css-separation.config.js'
		);
	} else {
		delete this.pkgFile[ 'devDependencies' ][ 'postcss-separator' ];
	}
};