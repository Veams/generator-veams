const fsx = require('fs-extra');
const helpers = require('../../lib/helpers');
const config = require('../../lib/config');
const configFile = helpers.getProjectConfig();
let customPromptMixins = [];

if (configFile.blueprints && configFile.blueprints.prompts) {
	customPromptMixins = require(`${process.cwd()}/${configFile.blueprints.prompts}`);
} else {
	customPromptMixins = require(`./mixins/${configFile.projectType}`);
}

module.exports = function questions() {
	let prompts = [];
	let _this = this;

	if (!this.options.name) {
		prompts = prompts.concat([
			{
				type: 'input',
				name: 'bpName',
				message: 'Define a blueprint name:',
				validate: function (answer) {
					const done = this.async();

					if (!answer) {
						done("Please add a blueprint name!");
						return;
					}
					done(true);
				}
			}
		])
	}
	if (!this.options.component && !this.options.utility && !this.options.custom) {
		prompts = prompts.concat([
			{
				name: 'bpTypeName',
				type: 'list',
				message: 'What type is your blueprint?',
				choices: [
					{
						name: 'component',
						value: 'component',
						checked: true
					},
					{
						name: 'utility',
						value: 'utility',
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
				return _this.options.custom || answers.bpTypeName === 'custom';
			},
			type: 'input',
			name: 'customTypeName',
			message: 'How do you call your custom type?',
			default: ''
		},
		{
			when: function (answers) {
				return answers.customTypeName;
			},
			type: 'input',
			name: 'customTypePrefix',
			message: 'You can now add a custom prefix, if you like.',
			default: ''
		}
	]);

	prompts = prompts.concat(customPromptMixins);

	return prompts;
};