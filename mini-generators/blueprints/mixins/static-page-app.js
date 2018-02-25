const bpConfig = require('../config');

module.exports = (context) => {
	return [
		{
			type: 'confirm',
			name: 'bpWithWrapWith',
			message: 'Do you want to use this blueprint as wrap-writh template?',
			default: false
		},
		{
			when: (answers) => answers.blueprints.indexOf('/scripts/bp.js.ejs') !== -1,
			type: 'list',
			name: 'bpDOM',
			message: 'Which DOM library do you use in your component?',
			choices: [
				{
					name: 'jQuery',
					value: 'jquery'
				},
				{
					name: '@veams/query',
					value: '@veams/query'
				},
				{
					name: 'No library at all',
					value: false
				}
			],
			default: false
		},
		{
			when: (answers) => answers.blueprints.indexOf('/scripts/bp.js.ejs') !== -1,
			type: 'checkbox',
			name: 'bpMethods',
			message: 'Which JavaScript methods should be added?',
			choices: [
				{
					name: 'willMount()',
					value: 'willMount'
				},
				{
					name: 'didMount()',
					value: 'didMount'
				},
				{
					name: 'events()',
					value: 'events'
				},
				{
					name: 'subscribe()',
					value: 'subscribe'
				}
			],
			default: ['didMount']
		},
		{
			when: () => bpConfig.types.indexOf(context.options.type) === -1,
			type: 'input',
			name: 'customTypePrefix',
			message: 'You can now add a custom prefix, if you like.',
			default: ''
		}
	]
};