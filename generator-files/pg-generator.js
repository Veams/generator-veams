var pgMethId = 'pgMethodology';
var pgSCSSId = 'pgSCSS';
var pgJSId = 'pgJS';
var pgComponentsId = 'pgComponents';

exports.questions = function () {
	return {
		name: 'pgPackages',
		type: 'checkbox',
		message: 'Do you want to use PG Packages (Bower Component)?',
		choices: [
			{
				name: 'PG Methodology',
				value: pgMethId,
				checked: true
			},
			{
				name: 'PG SCSS Starter Kit',
				value: pgSCSSId,
				checked: true
			},
			{
				name: 'PG JS Starter Kit',
				value: pgJSId,
				checked: false
			},
			{
				name: 'PG Components',
				value: pgComponentsId,
				checked: false
			}
		],
		default: this.config.get('pgPackages')
	};
};

exports.setup = function () {
	this.pgPackages = this.config.get('pgPackages') || [];
};

exports.scaffold = function () {
	// Add PG methodology
	if (!this.pgPackages && !this.pgPackages.length) return;

	if (this.pgPackages.indexOf(pgMethId) != -1) {

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
			this.directory('resources/templating/partials/components/_base', 'resources/templating/partials/components');

			// Modules
			this.directory('resources/templating/partials/modules', 'resources/templating/partials/modules');
		}

		// SCSS
		this.mkdir('resources/scss/blocks');
		this.mkdir('resources/scss/components');
		this.mkdir('resources/scss/modules');
		this.mkdir('resources/scss/regions');
	}
	if (this.pgPackages.indexOf(pgComponentsId) == -1) delete this.bowerFile['dependencies']['pg-components'];
};