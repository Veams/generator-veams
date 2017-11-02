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

			if (this.skipFiles.indexOf(file.absolutePath) === -1) {
				let cleanedFile = helpers.deleteFileExtension(file.absolutePath);
				let tplFileExtension = path.extname(cleanedFile);

				cleanedFile = cleanedFile.replace(path.basename('bp'), `${this.filename}`);

				this.fs.copyTpl(
					`${file.relativePath}`,
					`${this.rootFolderPath}${cleanedFile}`,
					Object.assign({}, this, {
						namespace: pkgFile.name || 'my-project',
						tplFileExtension
					})
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
			`${currentDefaultsPath}/INSERTPOINTS.md.ejs`,
			this.rootFolderPath + '/INSERTPOINTS.md',
			this
		);

		this.fs.copyTpl(
			`${currentDefaultsPath}/README.md.ejs`,
			this.rootFolderPath + '/README.md',
			this
		);

		this.fs.copyTpl(
			`${currentDefaultsPath}/settings.json.ejs`,
			`${this.rootFolderPath}/${this.filename}.settings.json`,
			this
		);
	}
};