var config = require('../lib/config');

module.exports = function promptAnswerFactory(customAnswers) {
	var defaults = {
		projectName: '',
		projectAuthor: '',
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
		veamsPackages: [],
		docs: []
	};

	var custom = defaults;
	var val;

	for (val in customAnswers) {
		if (customAnswers.hasOwnProperty(val)) {
			custom[val] = customAnswers[val];
		}
	}

	return custom;
};
