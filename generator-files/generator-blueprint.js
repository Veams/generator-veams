var helpers = require('../lib/helpers');
var config = require('../lib/config');

exports.questions = function () {
	return [
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
		}, {
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
		},
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
	];
};


exports.save = function (props) {
	this.filename = helpers.hyphenate(props.bpName);
	this.bpName = helpers.toCamelCase(props.bpName);
	this.bpType = props.bpType === 'global' ? '' : props.bpType;
	this.bpWrapWith = props.bpWithWrapWith;
	this.bpJsName = helpers.capitalizeFirstLetter(this.bpName);
	this.bpWithJs = props.bpWithJs || false;
};

exports.setup = function () {
	this.dataFile = 'data/bp.json.ejs';
	this.tplFile = 'partials/bp.hbs.ejs';
	this.styleFile = 'scss/bp.scss.ejs';
	this.usageFile = 'usage/README.md.ejs';
	this.jsFile = 'js/bp.js.ejs';
};

exports.scaffold = function () {
	this.template(this.dataFile, this.filename + '/data/' + this.filename + '-bp.json');
	this.template(this.tplFile, this.filename + '/partials/' + this.bpType + this.filename + '.hbs');
	this.template(this.styleFile, this.filename + '/scss/_' + this.bpType + this.filename + '.scss');
	this.template(this.usageFile, this.filename + '/usage/README.md');
	if (this.bpWithJs) {
		this.template(this.jsFile, this.filename + '/js/' + this.filename + '.js');
	}
};