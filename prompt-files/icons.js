exports.questions = function (obj) {
	let object = obj || {};
	object.defaults = object.defaults !== false;

	return {
		type: 'list',
		name: 'icons',
		message: 'Which icon workflow do you want to use?',
		choices: [
			{
				name: 'Webfont',
				value: 'webfont'
			},
			{
				name: 'CSS Sprites',
				value: 'sprites'
			},
			{
				name: 'Inline SVGs (Grunticon)',
				value: 'grunticon'
			}
		],
		default: this.config.get('icons')
	};
};

exports.setup = function () {
	this.icons = this.config.get('icons').toString();
	this.gruntModules = this.config.get('gruntModules') || [];
	
	switch(this.icons) {
		case 'webfont':
			this.gruntModules.push('grunt-webfont');
			break;
		case 'grunticon':
			this.gruntModules.push('grunt-grunticon');
			break;
		default: this.gruntModules.push('grunt-dr-svg-sprites');
	}

	this.config.set('gruntModules', this.gruntModules);
};