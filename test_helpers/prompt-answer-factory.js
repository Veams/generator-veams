module.exports = function promptAnwerFactory(customAnswers) {
	var defaults = {
	  'projectName': true,
	  'projectAuthor': 'Test Author',
	  'installAssemble': true,
	  'installPlugin': true,
	  'plugin': ['assemble-related-pages'],
	  'modules': [	'grunt-grunticon', 
	  				'grunt-packager',
	  				'grunt-browser-sync',
	  				'grunt-autoprefixer'
	  ],
	  'features': [],
	  'mobileFirst': false,
	  'jsLibs': false,
	  'cssLibs': false,
	  'installCMS': false
	};

	var custom = defaults;
	var val;

	for(val in customAnswers) {
		if(customAnswers.hasOwnProperty(val) && defaults[val]) {
			custom[val] = customAnswers[val];
		} 
	}

	return custom;
};