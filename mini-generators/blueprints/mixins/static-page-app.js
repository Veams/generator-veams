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
			when: () => bpConfig.types.indexOf(context.options.type) === -1,
			type: 'input',
			name: 'customTypePrefix',
			message: 'You can now add a custom prefix, if you like.',
			default: ''
		}
	]
};