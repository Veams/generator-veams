const path = require('path');
const helpers = require('../../lib/helpers');
const config = require('../../lib/config');
const configFile = helpers.getProjectConfig();

module.exports = function setup() {
	let checkConfig = function (type) {
		return configFile &&
			configFile &&
			configFile &&
			configFile.blueprints &&
			configFile.blueprints[type]
	};

	this.jsPath = this.path + '/' + this.filename + '/scripts/';
	this.scssPath = this.path + '/' + this.filename + '/styles/';
	this.partialsPath = this.path + '/' + this.filename + '/templates/';
	this.dataPath = this.path + '/' + this.filename + '/data/';
	this.rootFolderPath = this.path + '/' + this.filename + '/';


	this.dataFile = checkConfig('data') ? process.cwd() + '/' + configFile.blueprints.data : 'data/bp.json.ejs';
	this.dataFileExtension = path.extname(helpers.deleteFileExtension(this.dataFile));

	this.tplFile = checkConfig('partial') ? process.cwd() + '/' + configFile.blueprints.partial : 'templates/bp.hbs.ejs';
	this.tplFileExtension = path.extname(helpers.deleteFileExtension(this.tplFile));

	this.styleFile = checkConfig('style') ? process.cwd() + '/' + configFile.blueprints.style : 'styles/bp.scss.ejs';
	this.styleFileExtension = path.extname(helpers.deleteFileExtension(this.styleFile));

	this.usageFile = checkConfig('readme') ? process.cwd() + '/' + configFile.blueprints.readme : 'usage/README.md.ejs';
	this.usageFileExtension = path.extname(helpers.deleteFileExtension(this.usageFile));

	this.insertpointsFile = checkConfig('insertpoints') ? process.cwd() + '/' + configFile.blueprints.insertpoints : 'usage/INSERTPOINTS.md.ejs';
	this.insertpointsFileExtension = path.extname(helpers.deleteFileExtension(this.usageFile));

	this.jsFile = checkConfig('js') ? process.cwd() + '/' + configFile.blueprints.js : 'scripts/bp.js.ejs';
	this.jsFileExtension = path.extname(helpers.deleteFileExtension(this.jsFile));
};