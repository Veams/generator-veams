'use strict';

const serverConfig = require('./config');

module.exports = function prompts() {
	return [
		{
			name: 'server',
			type: 'checkbox',
			message: 'Which features do you want to use on the server side?',
			choices: [
				{
					name: 'Support fake data generation',
					value: serverConfig.serverFakeId,
					checked: true
				}
			],
			default: this.config.get('server')
		}
	];
};
