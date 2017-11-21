module.exports = function scaffold() {
	this.veamsFile.projectType = this.config.get('projectType');

	if (this.projectType === 'single-page-app') {
		// Core
		this.fs.copy(
			this.templatePath('src/app/core/containers/core/core.js'),
			'src/app/core/containers/core/core.js'
		);

		this.fs.copy(
			this.templatePath('src/app/core/index.js'),
			'src/app/core/index.js'
		);

		this.fs.copy(
			this.templatePath('src/app/app.routes.js'),
			'src/app/app.routes.js'
		);

		this.fs.copy(
			this.templatePath('src/app/static/index.html'),
			'src/app/static/index.html'
		);

		this.fs.copy(
			this.templatePath('gitkeep'),
			'src/app/features/.gitkeep'
		)
	}

	if (this.projectType === 'static-page-app') {
		// Layouts
		this.fs.copy(
			this.templatePath('src/app/core/layouts/README.md'),
			'src/app/core/layouts/README.md'
		);
	}
};