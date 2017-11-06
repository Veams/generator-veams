module.exports = function scaffold() {
	this.veamsFile.projectType = this.config.get('projectType');

	if (this.projectType === 'single-page-app') {
		// Core
		this.fs.copy(
			this.templatePath('src/core/containers/core/core.js'),
			'src/core/containers/core/core.js'
		);

		this.fs.copy(
			this.templatePath('src/core/index.js'),
			'src/core/index.js'
		);

		this.fs.copy(
			this.templatePath('src/app.routes.js'),
			'src/app.routes.js'
		);

		this.fs.copy(
			this.templatePath('src/static/index.html'),
			'src/static/index.html'
		);

		this.fs.copy(
			this.templatePath('gitkeep'),
			'src/features/.gitkeep'
		)
	}

	if (this.projectType === 'static-page-app') {
		// Layouts
		this.fs.copy(
			this.templatePath('src/core/layouts/README.md'),
			'src/core/layouts/README.md'
		);
	}
};