'use strict';

const config = require('./config');

module.exports = function scaffold() {
	if (this.taskRunner !== config.gruntId) {
		delete this.pkgFile[ 'devDependencies' ][ 'grunt' ];
		delete this.pkgFile[ 'devDependencies' ][ 'grunt-browserify' ];
		delete this.pkgFile[ 'devDependencies' ][ 'grunt-chokidar' ];
		delete this.pkgFile[ 'devDependencies' ][ 'grunt-concurrent' ];
		delete this.pkgFile[ 'devDependencies' ][ 'grunt-contrib-clean' ];
		delete this.pkgFile[ 'devDependencies' ][ 'grunt-contrib-cssmin' ];
		delete this.pkgFile[ 'devDependencies' ][ 'grunt-combine-mq' ];
		delete this.pkgFile[ 'devDependencies' ][ 'grunt-sync' ];
		delete this.pkgFile[ 'devDependencies' ][ 'grunt-sass-globber' ];
		delete this.pkgFile[ 'devDependencies' ][ 'grunt-sass' ];
		delete this.pkgFile[ 'devDependencies' ][ 'gulp-grunt' ];
		delete this.pkgFile[ 'devDependencies' ][ 'jit-grunt' ];
		delete this.pkgFile[ 'devDependencies' ][ 'load-grunt-configs' ];
		delete this.pkgFile[ 'devDependencies' ][ 'time-grunt' ];
	} else {
		this.fs.copyTpl(
			this.templatePath('Gruntfile.js.ejs'),
			'Gruntfile.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_clean.js.ejs'),
			this.gruntPath + 'clean.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_concurrent.js.ejs'),
			this.gruntPath + 'concurrent.js',
			this
		);
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'cssmin.js'),
			this.gruntPath + 'cssmin.js'
		);
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_sync.js.ejs'),
			this.gruntPath + 'sync.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_sass.js.ejs'),
			this.gruntPath + 'sass.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_watch.js.ejs'),
			this.gruntPath + 'chokidar.js',
			this
		);

		// Add NPM script
		// "local:start": "cross-env BABEL_ENV=client grunt serve",
		this.pkgFile[ 'scripts' ][ 'local:start' ] = 'cross-env BABEL_ENV=client grunt serve';
	}

	if (this.taskRunner !== config.webpackId) {
		delete this.pkgFile[ 'devDependencies' ][ 'webpack' ];
		delete this.pkgFile[ 'devDependencies' ][ 'stylelint-webpack-plugin' ];
		delete this.pkgFile[ 'devDependencies' ][ 'style-loader' ];
		delete this.pkgFile[ 'devDependencies' ][ 'sass-loader' ];
		delete this.pkgFile[ 'devDependencies' ][ 'react-dev-utils' ];
		delete this.pkgFile[ 'devDependencies' ][ 'postcss' ];
		delete this.pkgFile[ 'devDependencies' ][ 'postcss-loader' ];
		delete this.pkgFile[ 'devDependencies' ][ 'node-sass' ];
		delete this.pkgFile[ 'devDependencies' ][ 'extract-text-webpack-plugin' ];
		delete this.pkgFile[ 'devDependencies' ][ 'css-loader' ];
		delete this.pkgFile[ 'devDependencies' ][ 'copy-webpack-plugin' ];
		delete this.pkgFile[ 'devDependencies' ][ 'case-sensitive-paths-webpack-plugin' ];
		delete this.pkgFile[ 'devDependencies' ][ 'babel-loader' ];
		delete this.pkgFile[ 'devDependencies' ][ 'grunt-contrib-cssmin' ];
		delete this.pkgFile[ 'devDependencies' ][ 'grunt-combine-mq' ];
	} else {
		// Add NPM script
		// "local:start": "cross-env BABEL_ENV=client grunt serve",
		this.pkgFile[ 'scripts' ][ 'local:start' ] = 'webpack --watch --hide-modules';

		/**
		 * Copy common webpack files
		 */
		this.fs.copyTpl(
			this.templatePath('webpack.config.js'),
			'webpack.config.js',
			this
		);

		this.fs.copyTpl(
			this.templatePath(this.generatorHelperPath + 'tasks/_webpack/webpack.common.js'),
			this.helperPath + 'tasks/_webpack/webpack.common.js',
			this
		);

		this.fs.copyTpl(
			this.templatePath(this.generatorHelperPath + 'tasks/_webpack/plugins/scripts.plugins.js'),
			this.helperPath + 'tasks/_webpack/plugins/scripts.plugins.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath(this.generatorHelperPath + 'tasks/_webpack/plugins/styles.plugins.js'),
			this.helperPath + 'tasks/_webpack/plugins/styles.plugins.js',
			this
		);

		this.fs.copyTpl(
			this.templatePath(this.generatorHelperPath + 'tasks/_webpack/rules/styling.js'),
			this.helperPath + 'tasks/_webpack/rules/styling.js',
			this
		);
		this.fs.copyTpl(
			this.templatePath(this.generatorHelperPath + 'tasks/_webpack/rules/scripting.js'),
			this.helperPath + 'tasks/_webpack/rules/scripting.js',
			this
		);

	}
};