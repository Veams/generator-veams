var gruntId = 'grunt';
var gulpId = 'gulp';

exports.questions = function () {
	return {
		type: 'checkbox',
		name: 'taskRunner',
		message: 'Which task runner do you want to use?',
		choices: [
			{
				name: 'Grunt',
				value: gruntId
			},
			{
				name: 'Gulp',
				value: gulpId
			}
		],
		validate: function (answer) {
			if (answer.length === 0) {
				return false;
			} else {
				return true;
			}
		},
		default: this.config.get('taskRunner')
	};
};

exports.setup = function () {
	this.taskRunner = this.config.get('taskRunner') || [];
};

exports.scaffold = function () {};