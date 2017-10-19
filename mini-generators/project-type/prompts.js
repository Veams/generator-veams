export default function questions(obj) {
	let object = obj || {};
	object.defaults = object.defaults !== false;

	return {
		type: 'list',
		name: 'projectType',
		message: 'What kind of project do you want to create?',
		choices: [
			{
				name: 'Static Page Application',
				value: 'static-page-app'
			},
			{
				name: 'Single Page Application',
				value: 'single-page-app'
			}
		],
		default: 'static-page-app'
	};
};