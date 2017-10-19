export default function setup() {
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