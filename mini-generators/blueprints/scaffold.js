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
				let cleanedFile = path.normalize(helpers.deleteFileExtension(file.absolutePath));
				let tplFileExtension = path.extname(cleanedFile);
				let context = Object.assign({}, this, {
					namespace: pkgFile.name || 'my-project',
					tplFileExtension
				});
				cleanedFile = cleanedFile.replace(path.basename('bp'), `${this.filename}`);
				cleanedFile = cleanedFile.replace(this.currentBpPath, '');
				
				this.fs.copyTpl(
					`${file.absolutePath}`,
					`${this.rootFolderPath}/${cleanedFile}`,
					context
				);
			}
		}
	}

	if (configFile.blueprints &&
		configFile.blueprints[this.bpTypeName] &&
		configFile.blueprints[this.bpTypeName].defaults
	) {
		currentDefaultsPath = path.normalize(`${cwd}/${configFile.blueprints[this.bpTypeName].defaults}`);
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
}