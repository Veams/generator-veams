const config = require('./config');

module.exports = function prompts() {
	return {
		name: 'jsLibs',
		type: 'checkbox',
		message: 'Do you want to use any JS Libraries?',
		choices: [
			{
				name: 'Veams-Query',
				value: config.veamsQueryId,
				checked: false
			},
			{
				name: 'jQuery (latest Version)',
				value: config.jqueryId,
				checked: false
			},
			{
				name: 'React',
				value: config.reactId,
				checked: false
			}
		],
		validate: function (answer) {
			let done = this.async();

			if (answer.indexOf(config.jqueryId) != -1 && answer.indexOf(config.veamsQueryId) != -1) {

				done("Please choose only one of the two DOM handler libraries.", false);
			}

			done(null, true);
		},
		default: this.config.get('jsLibs')
	};
};
