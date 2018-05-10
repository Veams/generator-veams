const config = require('./config');
const id = 'jsLibs';
const type = 'checkbox';
const message = 'Do you want to use any further JavaScript libraries?';

module.exports = function prompts() {
	return [
		{
			when: answers => answers.projectType === 'static-page-app',
			name: id,
			type: type,
			message: message,
			choices: [
				{
					name: 'jQuery (latest Version)',
					value: config.jqueryId,
					checked: false
				},
				{
					name: 'Handlebars',
					value: config.handlebarsId,
					checked: false
				},
				{
					name: 'Redux',
					value: config.reduxId,
					checked: false
				},
				{
					name: 'RxJS',
					value: config.rxjsId,
					checked: false
				}
			],
			default: this.config.get(id)
		},
		{
			when: answers => answers.projectType === 'single-page-app',
			name: id,
			type: type,
			message: message,
			choices: [
				{
					name: 'Redux',
					value: config.reduxId,
					checked: true
				},
				{
					name: 'RxJS',
					value: config.rxjsId,
					checked: false
				}
			],
			default: this.config.get(id)
		}
	];
};
