var veamsMethId = 'veamsMethodology';
var veamsSCSSId = 'veamsSCSS';
var veamsJSId = 'veamsJS';

exports.questions = function () {
	return {
		name: 'veamsPackages',
		type: 'checkbox',
		message: 'Do you want to use Veams Extensions?',
		choices: [
			{
				name: 'Veams-Methodology',
				value: veamsMethId,
				checked: true
			},
			{
				name: 'Veams-Sass (Bower Component)',
				value: veamsSCSSId,
				checked: true
			},
			{
				name: 'Veams-JS (Bower Component, only usable with Browserify) ',
				value: veamsJSId,
				checked: false
			}
		],
		default: this.config.get('veamsPackages')
	};
};

exports.setup = function () {
	this.veamsPackages = this.config.get('veamsPackages') || [];
};

exports.overwriteSetup = function () {
	if (this.veamsPackages.indexOf(veamsJSId) !== -1) {
		if (this.taskRunner.indexOf('gulp') === -1) {
			var gruntModules = this.config.get('gruntModules');

			gruntModules.push('grunt-contrib-handlebars');
			gruntModules.push('grunt-browserify');
			gruntModules.push('grunt-contrib-uglify');

			this.config.set('gruntModules', gruntModules);
		}
	}
};

exports.scaffold = function () {
	if (!this.veamsPackages && !this.veamsPackages.length) {
		delete this.bowerFile['dependencies']['veams-js'];
		delete this.bowerFile['dependencies']['veams-sass'];

		return;
	}

	if (this.veamsPackages.indexOf(veamsMethId) != -1) {

		if (this.templateEngine !== '') {
			// Data
			this.mkdir('resources/templating/data/blocks');
			this.mkdir('resources/templating/data/pages');
			this.mkdir('resources/templating/data/_global');

			// Layouts
			this.copy('resources/templating/layouts/README.md');

			// Blocks
			this.copy('resources/templating/partials/blocks/README.md');
			this.copy('resources/templating/partials/blocks/b-sitemap.hbs');

			// Components
			this.copy('resources/templating/partials/components/README.md');

			// Utilities
			this.copy('resources/templating/partials/utilities/README.md');
		}

		// SCSS
		this.mkdir('resources/scss/blocks');
		this.mkdir('resources/scss/utilities');
		this.mkdir('resources/scss/components');
		this.mkdir('resources/scss/layouts');
	}
	if (this.veamsPackages.indexOf(veamsJSId) === -1) delete this.bowerFile['dependencies']['veams-js'];
	if (this.veamsPackages.indexOf(veamsSCSSId) === -1) delete this.bowerFile['dependencies']['veams-sass'];
};