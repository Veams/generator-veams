let gruntId = 'grunt';
let webpackId = 'webpack';

exports.questions = function (obj) {
	let object = obj || {};
	object.defaults = object.defaults !== false;

	return {
		type: 'list',
		name: 'taskRunner',
		message: 'Which task runner do you want to use?',
		choices: [
			{
				name: 'Grunt',
				value: gruntId,
				checked: object.defaults
			},
			// {
			// 	name: 'Webpack',
			// 	value: webpackId,
			// 	checked: object.defaults
			// }
		],
		default: this.config.get('taskRunner')
	};
};

exports.setup = function () {
	this.taskRunner = this.config.get('taskRunner') || [];
};