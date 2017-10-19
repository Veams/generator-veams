export default function questions(obj) {
	let object = obj || {};
	object.defaults = object.defaults !== false;

	return {
		type: 'list',
		name: 'icons',
		message: 'Which icon workflow do you want to use?',
		choices: [
			{
				name: 'CSS Sprites',
				value: 'sprites'
			},
			{
				name: 'Webfont',
				value: 'webfont'
			},
			{
				name: 'Inline SVGs (Grunticon)',
				value: 'grunticon'
			}
		],
		default: 'sprites'
	};
};