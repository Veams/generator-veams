module.exports = function promptAnswerFactory(customAnswers) {
	var defaults = {
		"projectName": "",
		"projectAuthor": "",
		"installAssemble": false,
		"installPlugin": false,
		"installCMS": false,
		"modules": [
			"grunt-combine-mq",
			"grunt-dr-svg-sprites"
		],
		"features": [
			"sassInsteadOfCompass"
		],
		"jsLibs": [],
		"cssLibs": [],
		"installProxy": false,
		"proxyHost": "0.0.0.0",
		"proxyPort": 80,
		"author": {
			"name": "",
			"login": "",
			"email": ""
		}
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
