import {reactId, jqueryId, veamsQueryId} from './config';

export default function questions() {
	return {
		name: 'jsLibs',
		type: 'checkbox',
		message: 'Do you want to use any JS Libraries?',
		choices: [
			{
				name: 'Veams-Query',
				value: veamsQueryId,
				checked: false
			},
			{
				name: 'jQuery (latest Version)',
				value: jqueryId,
				checked: false
			},
			{
				name: 'React',
				value: reactId,
				checked: false
			}
		],
		validate: function (answer) {
			let done = this.async();

			if (answer.indexOf(jqueryId) != -1 && answer.indexOf(veamsQueryId) != -1) {

				done("Please choose only one of the two DOM handler libraries.", false);
			}

			done(null, true);
		},
		default: this.config.get('jsLibs')
	};
};
