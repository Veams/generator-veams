exports.questions = function (obj) {
	let object = obj || {};
	object.defaults = object.defaults !== false;

	return {
		type: 'list',
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
				name: 'Coding style formatter (CSScomb)',
				value: 'cssComb'
			}
		],
		default: this.config.get('cssPostProcessors')
	};
};

exports.setup = function () {
	this.cssPostProcessors = this.config.get('cssPostProcessors');
	this.gruntModules = this.config.get('gruntModules') || [];

	if (this.cssPostProcessors.indexOf('autoprefixer') > -1) {
		this.gruntModules.push('grunt-autoprefixer');
	}

	if (this.cssPostProcessors.indexOf('postCssSeparator') > -1) {
		this.gruntModules.push('grunt-postcss-separator');
	}

	if (this.cssPostProcessors.indexOf('cssComb') > -1) {
		this.gruntModules.push('grunt-csscomb'); // TODO: Write own script
	}

	this.config.set('gruntModules', this.gruntModules);
};