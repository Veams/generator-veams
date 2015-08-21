var jscsId = 'jscs';
var webdriverId = 'webdriver';
var karmaId = 'karma';

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
					name: 'JavaScript Code Style (jscs)',
					value: jscsId,
					checked: true
				},
				{
					name: 'E2E - End to End (webdriver)',
					value: webdriverId,
					checked: true
				}/*,
				{
					name: 'Unit Testing (karma, mocha, sinon, chai)',
					value: karmaId,
					checked: false
				}*/
			],
			default: this.config.get('testAndQALibs')
		}
	];
};

exports.setup = function () {
	this.testAndQALibs = this.config.get('testAndQALibs') || [];
};

exports.scaffold = function () {
	// not ready for gulp yet
	if (this.taskRunner.indexOf('gulp') !== -1) return;
	if (!this.testAndQALibs && !this.testAndQALibs.length) return;

	if (this.testAndQALibs.indexOf(jscsId) !== -1) {
		this.copy('helpers/task-configs/jscs.airbnb.json');

		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.copy('helpers/_grunt/jscs.js', 'helpers/_grunt/jscs.js');
		}
	}

	if (this.testAndQALibs.indexOf(webdriverId) !== -1) {

		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.copy('helpers/_grunt/webdriver.js', 'helpers/_grunt/webdriver.js');
			// create demo document
			this.template('test/webdriver.html.ejs', 'test/helpers/html/test.html');
			// create demo document
			this.copy('test/demo.test.js', 'test/helpers/html/demo.test.js');
			// create demo spec
			this.copy('test/demo.spec.js', 'test/spec/e2e/demo.spec.js');
		}
	}

	if (this.testAndQALibs.indexOf(karmaId) !== -1) {

		if (this.taskRunner.indexOf('grunt') !== -1) {
			//this.copy('helpers/_grunt/karma.js', 'helpers/_grunt/karma.js');
		}
	}
};