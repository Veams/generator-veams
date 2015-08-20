var pg = require('../lib/pg-helpers');

exports.construct = function (name) {
	// This method adds support for a `--coffee` flag
	this.option('amd');
	this.option('commonjs');
	this.jsName = name;
};

exports.questions = function () {
	var prompts = [
		{
			name: "srcPath",
			message: "Where do you have your source files?",
			default: "resources"
		},
		{
			name: 'path',
			message: 'Where would you like to place your ' + this.type + '?',
			validate: function (answer) {
				var done = this.async();

				if (!answer) {
					done("Please add a path!");
					return;
				}
				done(true);
			}
		},
		{
			name: 'initName',
			message: 'What do you want to name your ' + this.type + '?',
			default: 'data'
		}
	];

	if (this.type === 'View') {
		prompts = prompts.concat([
			{
				type: 'confirm',
				name: 'tpl',
				message: 'Would you like to create a template with your View?',
				default: false
			},
			{
				when: function (answers) {
					return answers.tpl;
				},
				name: "ext",
				message: "Which extension should your template file get?",
				default: "hbs"
			}
		]);
	}

	return prompts;
};

exports.save = function (props) {
	this.initName = props.initName;
	this.srcPath = pg.cleanupPath(props.srcPath);
	this.path = pg.cleanupPath(props.path);
	this.tpl = props.tpl || false;
	this.ext = props.ext || 'hbs';
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

	if (this.tpl && this.ext) {
		this.template('_Template.html', this.srcPath + 'js/' + this.path + this.initName + '.' + this.ext);
	}
};