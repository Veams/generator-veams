var helpers = require('../lib/helpers');
var config = require('../lib/config');
var configFile = helpers.getProjectConfig();

exports.construct = function () {
	this.argument('name', {
		type: String,
		required: true
	});

	this.argument('configFile', {
		type: String,
		required: false,
		optional: true
	});

	// This method adds support for flags
	this.option('tmp');
	this.option('component');


	if (this.configFile) {
		configFile = require(process.cwd() + '/' + this.configFile);
	}
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

	if (!this.options.component && !this.options.block && !this.options.utility) {
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
						name: 'something else',
						value: 'global',
						checked: false
					}
				]
			}
		]);
	}

	return prompts;
};


exports.save = function (props) {
	this.name = this.name ? this.name : props.bpName;
	this.filename = helpers.hyphenate(this.name);
	this.bpName = helpers.toCamelCase(this.name);
	this.bpWrapWith = props.bpWithWrapWith;
	this.bpJsName = helpers.capitalizeFirstLetter(this.bpName);
	this.bpWithJs = props.bpWithJs || false;

	if (this.options.component || this.options.block || this.options.utility) {
		if (this.options.component) {
			this.bpType = 'c-';
		} else if (this.options.block) {
			this.bpType = 'b-';
		} else if (this.options.utility) {
			this.bpType = 'u-';
		} else {
			this.bpType = '';
		}
	} else {
		this.bpType = props.bpType === 'global' ? '' : props.bpType;
	}

};

exports.setup = function () {
	var checkConfig = function (type) {
		return configFile &&
			configFile.options &&
			configFile.options.paths &&
			configFile.options.paths.blueprints &&
			configFile.options.paths.blueprints[type]
	};

	// TODO
	var setExtensions = function (type) {
	};

	this.dataFile = checkConfig('data') ? process.cwd() + '/' + configFile.options.paths.blueprints.data : 'data/bp.json.ejs';
	this.tplFile = checkConfig('partial') ? process.cwd() + '/' + configFile.options.paths.blueprints.partial : 'partials/bp.hbs.ejs';
	this.styleFile = checkConfig('style') ? process.cwd() + '/' + configFile.options.paths.blueprints.style : 'scss/bp.scss.ejs';
	this.usageFile = checkConfig('readme') ? process.cwd() + '/' + configFile.options.paths.blueprints.readme : 'usage/README.md.ejs';
	this.jsFile = checkConfig('js') ? process.cwd() + '/' + configFile.options.paths.blueprints.js : 'js/bp.js.ejs';
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

exports.postInstall = function () {
	helpers.deleteSettingsFile();
};