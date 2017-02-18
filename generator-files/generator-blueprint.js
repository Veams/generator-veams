'use strict';

const path = require('path');
const helpers = require('../lib/helpers');
const config = require('../lib/config');
const configFile = helpers.getProjectConfig();

exports.construct = function () {
	this.argument('name', {
		type: String,
		required: true
	});

	this.argument('customFolder', {
		type: String,
		required: false,
		optional: true
	});

	// This method adds support for flags
	this.option('tmp');
	this.option('component');
};

exports.questions = function () {
	let prompts = [];
	let _this = this;

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

	prompts = prompts.concat([
		{
			type: 'confirm',
			name: 'bpWithWrapWith',
			message: 'Do you want to use this blueprint as wrap-writh template?',
			default: false
		},
		{
			type: 'confirm',
			name: 'bpWithJs',
			message: 'Do you want to add JavaScript to this blueprint?',
			default: true
		}
	]);

	if (!this.options.component && !this.options.block && !this.options.utility && !this.options.custom) {
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
						name: 'utility',
						value: 'u-',
						checked: false
					},
					{
						name: 'general',
						value: 'global',
						checked: false
					},
					{
						name: 'custom',
						value: 'custom',
						checked: false
					}
				]
			}
		]);
	}

	prompts = prompts.concat([
		{
			when: function (answers) {
				return _this.options.custom || answers.bpType === 'custom';
			},
			type: 'input',
			name: 'customType',
			message: 'How do you want to prefix your custom type?',
			default: ''
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
	this.customType = false;
	this.customFolder = this.customFolder || false;

	if (this.options.component || this.options.block || this.options.utility || this.options.custom) {
		if (this.options.component) {
			this.bpType = 'c-';
		} else if (this.options.block) {
			this.bpType = 'b-';
		} else if (this.options.utility) {
			this.bpType = 'u-';
		} else if (this.options.custom) {
			this.bpType = 'custom';
		} else {
			this.bpType = '';
		}
	} else {
		this.bpType = props.bpType === 'global' ? '' : props.bpType;
	}

	if (this.bpType === 'custom') {
		this.bpType = props.customType + '-';
		this.customType = true;
	}

};

exports.setup = function () {
	let checkConfig = function (type) {
		return configFile &&
			configFile.options &&
			configFile.options.paths &&
			configFile.options.paths.blueprints &&
			configFile.options.paths.blueprints[type]
	};

	this.dataFile = checkConfig('data') ? process.cwd() + '/' + configFile.options.paths.blueprints.data : 'data/bp.json.ejs';
	this.dataFileExtension = path.extname(helpers.deleteFileExtension(this.dataFile));

	this.tplFile = checkConfig('partial') ? process.cwd() + '/' + configFile.options.paths.blueprints.partial : 'partials/bp.hbs.ejs';
	this.tplFileExtension = path.extname(helpers.deleteFileExtension(this.tplFile));

	this.styleFile = checkConfig('style') ? process.cwd() + '/' + configFile.options.paths.blueprints.style : 'scss/bp.scss.ejs';
	this.styleFileExtension = path.extname(helpers.deleteFileExtension(this.styleFile));

	this.usageFile = checkConfig('readme') ? process.cwd() + '/' + configFile.options.paths.blueprints.readme : 'usage/README.md.ejs';
	this.usageFileExtension = path.extname(helpers.deleteFileExtension(this.usageFile));

	this.jsFile = checkConfig('js') ? process.cwd() + '/' + configFile.options.paths.blueprints.js : 'js/bp.js.ejs';
	this.jsFileExtension = path.extname(helpers.deleteFileExtension(this.jsFile));
};

exports.scaffold = function () {
	let path = this.options.tmp ? 'tmp/' : '';

	this.fs.copyTpl(
		this.templatePath(this.dataFile),
		path + this.filename + '/data/' + this.filename + '-bp' + this.dataFileExtension,
		this
	);
	this.fs.copyTpl(
		this.templatePath(this.tplFile),
		path + this.filename + '/partials/' + this.bpType + this.filename + this.tplFileExtension,
		this
	);
	this.fs.copyTpl(
		this.templatePath(this.styleFile),
		path + this.filename + '/scss/_' + this.bpType + this.filename + this.styleFileExtension,
		this
	);
	this.fs.copyTpl(
		this.templatePath(this.usageFile),
		path + this.filename + '/README' + this.usageFileExtension,
		this
	);
	if (this.bpWithJs) {
		this.fs.copyTpl(
			this.templatePath(this.jsFile),
			path + this.filename + '/js/' + this.filename + this.jsFileExtension,
			this
		);
	}
};

exports.postInstall = function () {
	helpers.deleteSettingsFile();
};