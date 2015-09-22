var veamsMethId = 'veamsMethodology';
var veamsSCSSId = 'veamsSCSS';
var veamsJSId = 'veamsJS';
var veamsComponentsId = 'veamsComponents';

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
				name: 'Veams-JS (Bower Component)',
				value: veamsJSId,
				checked: false
			},
			{
				name: 'Veams-Components (Bower Component)',
				value: veamsComponentsId,
				checked: true
			}
		],
		default: this.config.get('veamsPackages')
	};
};

exports.setup = function () {
	this.veamsPackages = this.config.get('veamsPackages') || [];

	if (this.veamsPackages.indexOf(veamsJSId) !== -1) {
		var gruntModules = this.config.get('gruntModules');

		gruntModules.push('grunt-contrib-handlebars');
		gruntModules.push('grunt-browserify');

		this.config.set('gruntModules', gruntModules);
	}
};

exports.scaffold = function () {
	// Add PG methodology
	if (!this.veamsPackages && !this.veamsPackages.length) return;

	if (this.veamsPackages.indexOf(veamsMethId) != -1) {

		if (this.templateEngine !== '') {
			// Data
			this.mkdir('resources/templating/data/blocks');
			this.mkdir('resources/templating/data/pages');
			this.mkdir('resources/templating/data/_global');

			// General partial Readme
			this.copy('resources/templating/partials/README.md');

			// Layouts
			this.copy('resources/templating/layouts/README.md');

			// Blocks
			this.copy('resources/templating/partials/blocks/README.md');
			this.copy('resources/templating/partials/blocks/b-nav.hbs');

			// Components
			this.copy('resources/templating/partials/components/README.md');
		}

		// SCSS
		this.mkdir('resources/scss/blocks');
		this.mkdir('resources/scss/components');
		this.mkdir('resources/scss/layouts');
	}
	if (this.veamsPackages.indexOf(veamsComponentsId) == -1) delete this.bowerFile['dependencies']['veams-components'];
};