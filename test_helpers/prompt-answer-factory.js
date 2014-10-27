module.exports = function promptAnwerFactory(customAnswers) {
	var defaults = {
		projectName: "",
		projectAuthor: "",
		batchFiles: false,
		installAssemble: "",
		installPlugin: false,
		installCMS: false,
		modules: [
			"grunt-combine-media-queries",
			"grunt-grunticon",
			"grunt-data-separator"
		],
		features: [
			"sassInsteadOfCompass"
		],
		jsLibs: [],
		cssLibs: [],
		installProxy: false,
		proxyHost: '',
		proxyPort: '',
		author: {
			name: "",
			login: "",
			email: ""
		}
	};

	var custom = defaults;
	var val;

	for (val in customAnswers) {
		if (customAnswers.hasOwnProperty(val) && defaults[val]) {
			custom[val] = customAnswers[val];
		}
	}

	return custom;
};