var helpers = require('../lib/helpers');
var config = require('../lib/config');


exports.construct = function () {
	// This method adds support for a `--coffee` flag
	this.option('tmp');
	this.option('component');
};

exports.questions = function () {
	var prompts = [];

	if (!this.name) {
		prompts = prompts.concat([
			{
				type: 'input',
				name: 'bpName',
				message: 'Define a blueprint name:',
				validate: function (answer) {
					var done = this.async();

					if (!answer) {
						done("Please add a blueprint name!");
						return;
					}
					done(true);
				}
			}
		])
	}

	if (!this.options.component && !this.options.block) {
		prompts = prompts.concat([
			{
				name: 'bpType',
				type: 'list',
				message: 'What type is your blueprint?',
				choices: [
					{
						name: 'block',
						value: 'b-',
						checked: false
					},
					{
						name: 'component',
						value: 'c-',
						checked: true
					},
					{
						name: 'something else',
						value: 'global',
						checked: false
					}
				]
			}
		]);
	}

	prompts = prompts.concat([
		{
			type: 'confirm',
			name: 'bpWithWrapWith',
			message: 'Do you want use this blueprint as wrap-writh template?',
			default: false
		},
		{
			type: 'confirm',
			name: 'bpWithJs',
			message: 'Do you want to add JavaScript to this blueprint?',
			default: true
		}
	]);

	return prompts;
};


exports.save = function (props) {
	this.name = this.name ? this.name : props.bpName;
	this.filename = helpers.hyphenate(this.name);
	this.bpName = helpers.toCamelCase(this.name);
	this.bpWrapWith = props.bpWithWrapWith;
	this.bpJsName = helpers.capitalizeFirstLetter(this.bpName);
	this.bpWithJs = props.bpWithJs || false;

	if (this.options.component || this.options.block) {
		if (this.options.component) {
			this.bpType = 'c-';
		} else if (this.options.block) {
			this.bpType = 'b-';
		} else {
			this.bpType = '';
		}
	} else {
		this.bpType = props.bpType === 'global' ? '' : props.bpType;
	}

};

exports.setup = function () {
	this.dataFile = 'data/bp.json.ejs';
	this.tplFile = 'partials/bp.hbs.ejs';
	this.styleFile = 'scss/bp.scss.ejs';
	this.usageFile = 'usage/README.md.ejs';
	this.jsFile = 'js/bp.js.ejs';
};

exports.scaffold = function () {
	var path = this.options.tmp ? 'tmp/' : '';

	this.template(this.dataFile, path + this.filename + '/data/' + this.filename + '-bp.json');
	this.template(this.tplFile, path + this.filename + '/partials/' + this.bpType + this.filename + '.hbs');
	this.template(this.styleFile, path + this.filename + '/scss/_' + this.bpType + this.filename + '.scss');
	this.template(this.usageFile, path + this.filename + '/usage/README.md');
	if (this.bpWithJs) {
		this.template(this.jsFile, path + this.filename + '/js/' + this.filename + '.js');
	}
};