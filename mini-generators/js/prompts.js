const config = require('./config');

module.exports = function prompts() {
	const id = 'jsLibs';
	const type = 'checkbox';
	const message = 'Do you want to use any further JavaScript libraries?';
	return [
		{
			when: answers => answers.projectType === 'static-page-app',
			name: id,
			type: type,
			message: message,
			choices: [
				{
					name: 'Veams-Query',
					value: config.veamsQueryId,
					checked: false
				},
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
			validate: function (answer) {
				let done = this.async();

				if (answer.indexOf(config.jqueryId) != -1 && answer.indexOf(config.veamsQueryId) != -1) {

					done("Please choose only one of the two DOM handler libraries.", false);
				}

				done(null, true);
			},
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
