'use strict';

let config = require('../lib/config');

module.exports = function promptAnswerFactory(customAnswers) {
	let defaults = {
		projectName: '',
		projectAuthor: '',
		selfContained: true,
		taskRunner: [
			'grunt'
		],
		templateEngine: '',
		mangonyExpress: false,
		installExtendedLayout: true,
		installPlugin: false,
		gulpModules: [],
		gruntModules: [
			'grunt-combine-mq',
			'grunt-dr-svg-sprites'
		],
		features: [],
		jsLibs: [],
		cssLibs: [],
		testAndQA: false,
		testAndQALibs: [],
		veamsPackages: false,
		docs: []
	};

	let custom = defaults;
	let val;

	for (val in customAnswers) {
		if (customAnswers.hasOwnProperty(val)) {
			custom[val] = customAnswers[val];
		}
	}

	return custom;
};
