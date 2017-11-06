const fsx = require('fs-extra');
const path = require('path');
const helpers = require('../../lib/helpers');
const config = require('../../lib/config');
const bpHelpers = require('./helpers/bp-helpers');
let prompts = [];

module.exports = function questions() {
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
	if (!this.options.type) {
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
				return answers.bpTypeName === 'custom';
			},
			type: 'input',
			name: 'customTypeName',
			message: 'How do you call your custom type?',
			default: this.options.type
		}
	]);

	prompts = prompts.concat(this.customPromptMixins(this));
	prompts = prompts.concat([
		{
			type: 'checkbox',
			name: 'skipFiles',
			message: 'Which files do you want to skip?',
			choices: bpHelpers.prepareFilesForPrompt(this.bpFiles, this.options.name)
		}
	]);

	return prompts;
};
