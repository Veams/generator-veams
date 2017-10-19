import {gruntId, webpackId} from './config';

export default function questions(obj) {
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
		default: gruntId
	};
};