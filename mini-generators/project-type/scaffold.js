module.exports = function scaffold() {
	this.veamsFile.projectType = this.projectType;

	if (this.projectType === 'single-page-app') {
		// Core
		this.fs.copy(
			this.templatePath('src/app/core/containers/core/core.js'),
			this.destinationPath('src/app/core/containers/core/core.js')
		);
		this.fs.copy(
			this.templatePath('src/app/core/containers/core/core.scss'),
			this.destinationPath('src/app/core/containers/core/core.scss')
		);

		this.fs.copy(
			this.templatePath('src/app/core/index.js'),
			this.destinationPath('src/app/core/index.js')
		);

		// Layout
		this.fs.copy(
			this.templatePath('src/app/core/layouts/layout.js'),
			this.destinationPath('src/app/core/layouts/layout.js')
		);
		this.fs.copy(
			this.templatePath('src/app/core/layouts/layout.scss'),
			this.destinationPath('src/app/core/layouts/layout.scss')
		);

		// Core Components
		this.fs.copy(
			this.templatePath('src/app/core/components/section'),
			this.destinationPath('src/app/core/components/section')
		);

		// Routes
		this.fs.copy(
			this.templatePath('src/app/app.routes.js'),
			this.destinationPath('src/app/app.routes.js')
		);

		this.fs.copy(
			this.templatePath('src/app/static/index.html'),
			this.destinationPath('src/app/static/index.html')
		);

		this.fs.copy(
			this.templatePath('gitkeep'),
			this.destinationPath('src/app/features/.gitkeep')
		)
	}

	if (this.projectType === 'static-page-app') {
		// Layouts
		this.fs.copy(
			this.templatePath('src/app/core/layouts/README.md'),
			this.destinationPath('src/app/core/layouts/README.md')
		);
	}
};
