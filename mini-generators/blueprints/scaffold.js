module.exports = function scaffold() {
	this.fs.copyTpl(
		this.templatePath('usage/settings.json.ejs'),
		this.rootFolderPath + `${this.filename}.settings.json`,
		this
	);

	this.fs.copyTpl(
		this.templatePath(this.dataFile),
		this.dataPath + this.filename + '-bp' + this.dataFileExtension,
		this
	);
	this.fs.copyTpl(
		this.templatePath(this.tplFile),
		this.partialsPath + this.bpTypePrefix + this.filename + this.tplFileExtension,
		this
	);
	this.fs.copyTpl(
		this.templatePath(this.styleFile),
		this.scssPath + '/_' + this.bpTypePrefix + this.filename + this.styleFileExtension,
		this
	);
	this.fs.copyTpl(
		this.templatePath(this.usageFile),
		this.rootFolderPath + '/README' + this.usageFileExtension,
		this
	);
	this.fs.copyTpl(
		this.templatePath(this.insertpointsFile),
		this.rootFolderPath + '/INSERTPOINTS' + this.insertpointsFileExtension,
		this
	);
	if (this.bpWithJs) {
		this.fs.copyTpl(
			this.templatePath(this.jsFile),
			this.jsPath + this.filename + this.jsFileExtension,
			this
		);
	}

	if (this.options.tmp) {
		this.fs.copyTpl(
			this.templatePath(this.insertpointsFile),
			'tmp/' + this.filename + '/INSERTPOINTS.md',
			this
		);
	}
};