module.exports = function scaffold() {
	this.fs.copyTpl(
		this.templatePath(this.generatorHelperPath + 'tasks/_webpack/rules/_styling.js.ejs'),
		this.helperPath + 'tasks/_webpack/rules/styling.js',
		this
	);

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