const path = require('path');
const fs = require('fs');
const helpers = require('../../lib/helpers');
const configFile = helpers.getProjectConfig();

module.exports = function scaffold() {
	helpers.definePaths.bind(this);
	let cwd = process.cwd();
	let pkgFile = require(`${cwd}/package.json`);
	let currentDefaultsPath = `${this.templatePath()}/defaults`;

	for (let objName in this.bpFiles) {
		if (this.bpFiles.hasOwnProperty(objName)) {
			let file = this.bpFiles[objName];

			if (this.blueprints.indexOf(file.absolutePath) !== -1) {
				let cleanedFile = helpers.deleteFileExtension(file.absolutePath);
				let tplFileExtension = path.extname(cleanedFile);
				let context = Object.assign({}, this, {
					namespace: pkgFile.name || 'my-project',
					tplFileExtension
				});
				cleanedFile = cleanedFile.replace(path.basename('bp'), `${this.filename}`);
				cleanedFile = path.normalize(cleanedFile).replace(path.normalize(this.currentBpPath), '');

				this.fs.copyTpl(
					path.normalize(`${file.absolutePath}`),
					path.normalize(`${this.rootFolderPath}/${cleanedFile}`),
					context
				);
			}
		}
	}

	if (configFile.blueprints &&
		configFile.blueprints[this.bpTypeName] &&
		configFile.blueprints[this.bpTypeName].defaults
	) {
		currentDefaultsPath = `${cwd}/${configFile.blueprints[this.bpTypeName].defaults}`;
	}

	if (!this.options.skipDefaults && !this.skipByConfig) {
		this.fs.copyTpl(
			path.normalize(`${currentDefaultsPath}/INSERTPOINTS.md.ejs`),
			path.normalize(this.rootFolderPath + '/INSERTPOINTS.md'),
			this
		);

		this.fs.copyTpl(
			path.normalize(`${currentDefaultsPath}/README.md.ejs`),
			path.normalize(this.rootFolderPath + '/README.md'),
			this
		);

		this.fs.copyTpl(
			path.normalize(`${currentDefaultsPath}/settings.json.ejs`),
			path.normalize(`${this.rootFolderPath}/${this.filename}.settings.json`),
			this
		);
	}
};