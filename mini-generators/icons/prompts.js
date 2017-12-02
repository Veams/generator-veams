const config = require('./config');

module.exports = function questions(obj) {
	let object = obj || {};
	object.defaults = object.defaults !== false;

	return {
		type: 'checkbox',
		name: 'icons',
		message: 'Which icon workflow do you want to use?',
		choices: [
			{
				name: 'CSS Sprites',
				value: config.spriteId
			},
			{
				name: 'Webfont',
				value: config.webfontId
			},
			{
				name: 'Data-URI SVGs (Grunticon)',
				value: config.iconGrunticonId
			}
		],
		default: [config.spriteId]
	};
};