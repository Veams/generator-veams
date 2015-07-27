var jscsId = 'jscs';

exports.questions = function () {
	return [
		{
			name: 'testAndQA',
			type: 'confirm',
			message: 'Would you like to add testing and qa?',
			default: this.config.get('testAndQA')
		},
		{
			when: function (answers) {
				return answers.testAndQA;
			},
			name: 'testAndQALibs',
			type: 'checkbox',
			message: 'What would you like to test?',
			choices: [
				{
					name: 'JavaScript Code Style',
					value: jscsId,
					checked: true
				}
			],
			default: this.config.get('testAndQALibs')
		}
	];
};

exports.setup = function () {
};

exports.scaffold = function () {
	this.copy('helpers/task-configs/jscs.airbnb.json');

	if (this.testAndQALibs && this.testAndQALibs.length) {
		if (this.testAndQALibs.indexOf('jscs') != -1) {
			this.copy('helpers/_grunt/jscs.js', 'helpers/_grunt/jscs.js');
		}
	}
};