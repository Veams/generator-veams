var chalk = require('chalk');
var config = require('./../lib/config.js');
var helpers = require('../lib/helpers');

var hTimesId = 'helperTimes';
var hLimitId = 'helperLimit';
var hIfId = 'helperIf';
var hIfBlockId = 'helperIfBlock';
var hAutolinkId = 'helperAutolink';
var hWrapWithId = 'helperWrapWith';
var hMergeDataId = 'helperMergeData';
var hRandomId = 'helperRandom';
var hMarkdownId = 'helperMarkdown';
var hConcatPathId = 'helperConcatPath';
var hPictureDataId = 'helperPictureData';

exports.questions = function () {
	return [
		{
			name: "helperPath",
			message: "Where do you have your helper files for your templates",
			default: "resources/templating/helpers"
		}, {
			name: "templateHelperFiles",
			type: "checkbox",
			message: "Which Template Helpers do you want to install?",
			choices: [
				{
					name: "Times (Block Helper) - Repeat your html elements",
					value: hTimesId
				},
				{
					name: "Limit (Block Helper) - Limit your JSON output",
					value: hLimitId
				},
				{
					name: "If (Block Helper) - Execute an IF statement with any expression.",
					value: hIfId
				},
				{
					name: "IfBlock (Block Helper) - Determine if {{#block}} is set for extended layouts.",
					value: hIfBlockId
				},
				{
					name: "Autolink (Simple Helper) - Generate relative links.",
					value: hAutolinkId
				},
				{
					name: "WrapWith (Block Helper) - Enclose snippets with a predefined markup.",
					value: hWrapWithId
				},
				{
					name: "mergeData (Block Helper) - Merge two data objects.",
					value: hMergeDataId
				},
				{
					name: "Random Helper - Returns a random number.",
					value: hRandomId
				},
				{
					name: "Markdown Helper - Use markdown files to write your content.",
					value: hMarkdownId
				},
				{
					name: "Concat Path Helper - Concat paths in Veams.",
					value: hConcatPathId
				},
				{
					name: "Picture Data Helper - Get pictures presets from JSON.",
					value: hPictureDataId
				}
			],
			validate: function (answer) {
				if (answer.length === 0) {
					return false;
				} else {
					return true;
				}
			}
		}
	];
};

exports.prompts = function (props) {
	this.helperPath = props.helperPath;
	this.templateHelperFiles = props.templateHelperFiles;

	//save config to .yo-rc.json
	this.config.set(props);
};

exports.setup = function () {
	this.generatorHbsHelperPath = '../../' + config.paths.appPath + config.paths.hbsHelperPath;
	this.helperPath = this.helperPath || config.paths.helperPath;

	if (this.helperPath !== '') {
		this.helperPath = this.helperPath.replace(/\/?$/, '/');
	}
};

exports.scaffold = function () {

	if (this.templateHelperFiles && this.templateHelperFiles.length > 0) {
		if (this.templateHelperFiles.indexOf(hTimesId) != -1) {
			this.copy(this.generatorHbsHelperPath + "/helper-for.js", this.helperPath + "/helper-for.js");
		}
		if (this.templateHelperFiles.indexOf(hLimitId) != -1) {
			this.copy(this.generatorHbsHelperPath + '/helper-limit.js', this.helperPath + '/helper-limit.js');
		}
		if (this.templateHelperFiles.indexOf(hIfId) != -1) {
			this.copy(this.generatorHbsHelperPath + '/helper-xif.js', this.helperPath + '/helper-xif.js');
		}
		if (this.templateHelperFiles.indexOf(hIfBlockId) != -1) {
			this.copy(this.generatorHbsHelperPath + '/helper-ifBlock.js', this.helperPath + '/helper-ifBlock.js');
		}
		if (this.templateHelperFiles.indexOf(hAutolinkId) != -1) {
			this.npmInstall(['handlebars-helper-autolink'], {'saveDev': true});
			this.log(
				('\n') +
				chalk.bgRed(' Autolink Helper - Please add the following lines to your package.json)') + ('\n') +
				chalk.yellow('\n "keywords": [') +
				chalk.yellow('\n    "handlebars-helper-autolink"') +
				chalk.yellow('\n ]') + ('\n') + ('\n')
			);
		}
		if (this.templateHelperFiles.indexOf(hWrapWithId) != -1) {
			this.copy(this.generatorHbsHelperPath + '/helper-wrapWith.js', this.helperPath + '/helper-wrapWith.js');
			this.copy(this.generatorHbsHelperPath + '/alias.js', this.helperPath + '/alias.js');

			this.log(
				('\n') +
				chalk.bgRed('WrapWith Helper - For further instructions see: http://www.veams.org/generator/prompts/template-engines.html)') +
				chalk.yellow('\n') + ('\n') + ('\n')
			);
		}
		if (this.templateHelperFiles.indexOf(hMergeDataId) != -1) {
			this.copy(this.generatorHbsHelperPath + '/helper-mergeData.js', this.helperPath + '/helper-mergeData.js');

			this.log(
				('\n') +
				chalk.bgRed('MergeData Helper - For further instructions see: http://www.veams.org/generator/prompts/template-engines.html)') +
				chalk.yellow('\n') + ('\n') + ('\n')
			);
		}
		if (this.templateHelperFiles.indexOf(hRandomId) != -1) {
			this.copy(this.generatorHbsHelperPath + '/helper-random.js', this.helperPath + '/helper-random.js');
		}
		if (this.templateHelperFiles.indexOf(hMarkdownId) != -1) {
			this.copy(this.generatorHbsHelperPath + '/helper-markdown.js', this.helperPath + '/helper-markdown.js');
		}
		if (this.templateHelperFiles.indexOf(hConcatPathId) != -1) {
			this.copy(this.generatorHbsHelperPath + '/helper-concatPath.js', this.helperPath + '/helper-concatPath.js');
		}
		if (this.templateHelperFiles.indexOf(hPictureDataId) != -1) {
			this.copy(this.generatorHbsHelperPath + '/helper-pictureData.js', this.helperPath + '/helper-pictureData.js');
		}
	}
};

exports.postInstall = function () {
	helpers.deleteSettingsFile();
};