const config = require('./config');

module.exports = function prompts() {
	return {
		name: 'cssLibs',
		type: 'checkbox',
		message: 'Do you want to use any Sass Frameworks?',
		choices: [
			{
				name: 'Foundation',
				value: config.foundationId,
				checked: false
			},
			{
				name: 'Bourbon Neat',
				value: config.neatId,
				checked: false
			},
			{
				name: 'SASS Bootstrap',
				value: config.bootstrapId,
				checked: false
			},
			{
				name: 'Lost Grid (PostCSS)',
				value: config.lostGridId,
				checked: false
			},
			{
				name: 'Include Media',
				value: config.includeMediaId,
				checked: true
			}
		],
		default: this.config.get('cssLibs')
	};
};