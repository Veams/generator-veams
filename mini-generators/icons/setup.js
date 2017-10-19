module.exports = function setup() {
	this.icons = this.config.get('icons').toString();
	this.gruntModules = this.config.get('gruntModules') || [];

	switch (this.icons) {
		case 'webfont':
			this.gruntModules.push('grunt-webfont');
			break;
		case 'grunticon':
			this.gruntModules.push('grunt-grunticon');
			break;
		default:
			this.gruntModules.push('grunt-dr-svg-sprites');
	}

	this.config.set('gruntModules', this.gruntModules);
};