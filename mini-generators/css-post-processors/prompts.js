module.exports = function questions(obj) {
	let object = obj || {};
	object.defaults = object.defaults !== false;

	return {
		type: 'checkbox',
		name: 'cssPostProcessors',
		message: 'Which CSS post-processors do you want to use?',
		choices: [
			{
				name: 'Autoprefixer (PostCSS)',
				value: 'autoprefixer',
				checked: true
			},
			{
				name: 'CSS Separator (PostCSS)',
				value: 'postCssSeparator'
			},
			{
				name: 'CSS Next (PostCSS)',
				value: 'cssNext'
			}
		],
		default: this.config.get('cssPostProcessors')
	};
};