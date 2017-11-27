const config = require('./config');

module.exports = function questions(obj) {
	let object = obj || {};
	object.defaults = object.defaults !== false;

	return {
		type: 'list',
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
				name: 'Inline SVGs (Grunticon)',
				value: config.svgIconsId
			}
		],
		default: config.spriteId
	};
};