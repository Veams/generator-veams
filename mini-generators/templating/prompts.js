module.exports = function prompts() {
	return [
		{
			when: function (answers) {
				return answers.taskRunner
					&& answers.taskRunner.length;
			},
			type: 'list',
			name: 'templateEngine',
			message: 'Which Template Engine do you want to use?',
			choices: [
				{
					name: 'Mangony with Handlebars',
					value: 'mangonyHbs'
				},
				{
					name: 'Mangony with React',
					value: 'mangonyReact'
				}
			],
			default: 'mangonyHbs'
		}
	];
};