module.exports = function setup() {
	this.cssPostProcessors = this.config.get('cssPostProcessors');

	if (this.taskRunner === 'grunt') {
		this.gruntModules = this.config.get('gruntModules') || [];

		if (this.cssPostProcessors.indexOf('autoprefixer') > -1) {
			this.gruntModules.push('grunt-autoprefixer');
		}

		this.config.set('gruntModules', this.gruntModules);
	}
};