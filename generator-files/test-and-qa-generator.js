var jscsId = 'jscs';

exports.questions = function () {
	return [
		{
			when: function (answers) {
				return answers.taskRunner
					&& answers.taskRunner.length
					&& answers.taskRunner.indexOf('gulp') === -1;
			},
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
	this.testAndQALibs = this.config.get('testAndQALibs') || [];
};

exports.scaffold = function () {
	if (!this.testAndQALibs && !this.testAndQALibs.length) return;

	if (this.taskRunner.indexOf('gulp') === -1 && this.testAndQALibs.indexOf('jscs') != -1) {
		this.copy('helpers/task-configs/jscs.airbnb.json');

		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.copy('helpers/_grunt/jscs.js', 'helpers/_grunt/jscs.js');
		}
	}
};