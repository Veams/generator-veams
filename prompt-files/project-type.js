exports.questions = function (obj) {
	let object = obj || {};
	object.defaults = object.defaults !== false;

	return {
		type: 'list',
		name: 'projectType',
		message: 'What kind of project do you want to create?',
		choices: [
			{
				name: 'Single Page Application (SPA)',
				value: 'spa'
			},
			{
				name: 'Multi Page Application (MPA)',
				value: 'mpa'
			}
		],
		default: this.config.get('projectType')
	};
};

exports.setup = function () {};