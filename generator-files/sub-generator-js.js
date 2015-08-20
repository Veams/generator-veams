var yeoman = require('yeoman-generator');

exports.construct = function (name) {
	// This method adds support for a `--coffee` flag
	this.option('amd');
	this.option('commonjs');
	this.jsName = name;
};

exports.setup = function () {
	this.tplFile = '_' + this.jsName + '.esh.js.ejs';

	if (this.options.amd) {
		this.tplFile = '_' + this.jsName + '.amd.js.ejs'
	}
	if (this.options.commonjs) {
		this.tplFile = '_' + this.jsName + '.common.js.ejs'
	}
};

exports.scaffold = function () {
	this.template(this.tplFile, this.srcPath + 'js/' + this.path + this.initName + this.jsName + '.js');
};