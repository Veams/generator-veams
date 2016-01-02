var helpers = require('../lib/helpers');
var config = require('../lib/config');

exports.questions = function () {
	return [
		{
			type: 'input',
			name: 'componentName',
			message: 'Define a component name:',
			validate: function (answer) {
				var done = this.async();

				if (!answer) {
					done("Please add a component name!");
					return;
				}
				done(true);
			}
		},
		{
			type: 'confirm',
			name: 'componentWithJs',
			message: 'Do you want to add JavaScript to this component?',
			default: true
		}
	];
};


exports.save = function (props) {
	this.filename = helpers.hyphenate(props.componentName);
	this.componentName = helpers.toCamelCase(props.componentName);
	this.componentJsName = helpers.capitalizeFirstLetter(this.componentName);
	this.componentWithJs = props.componentWithJs || false;
};

exports.setup = function () {
	this.dataFile = 'data/component.json.ejs';
	this.tplFile = 'partials/component.hbs.ejs';
	this.styleFile = 'scss/component.scss.ejs';
	this.usageFile = 'usage/README.md.ejs';
	this.jsFile = 'js/component.js.ejs';
};

exports.scaffold = function () {
	this.template(this.dataFile, this.filename + '/data/' + this.filename + '-bp.json');
	this.template(this.tplFile, this.filename + '/partials/c-' + this.filename + '.hbs');
	this.template(this.styleFile, this.filename + '/scss/_c-' + this.filename + '.scss');
	this.template(this.usageFile, this.filename + '/usage/' + this.filename + '.md');
	if (this.componentWithJs) {
		this.template(this.jsFile, this.filename + '/js/' + this.filename + '.js');
	}
};