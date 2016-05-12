var gruntId = 'grunt';
var gulpId = 'gulp';

exports.questions = function () {
	return [
		{
			when: function (answers) {
				return answers.taskRunner
					&& answers.taskRunner.length
					&& answers.taskRunner.indexOf('gulp') === -1;
			},
			type: 'list',
			name: 'templateEngine',
			message: 'Which Template Engine do you want to install?',
			choices: [
				{name: 'Mangony', value: 'mangony'},
				{name: 'Assemble', value: 'assemble'},
				{name: 'none', value: ''}
			],
			default: 'mangony'
		},
		{
			when: function (answers) {
				return answers.templateEngine
					&& answers.templateEngine.length
					&& answers.templateEngine.indexOf('assemble') !== -1;
			},
			type: 'confirm',
			name: 'installPlugin',
			message: 'Do you want to install Assemble-Plugins?',
			default: this.config.get('installPlugin')
		},
		{
			when: function (answers) {
				return answers.templateEngine
					&& answers.templateEngine.length
					&& answers.installPlugin;
			},
			name: 'plugin',
			type: 'checkbox',
			message: 'Which Assemble-Plugin do you want to use?',
			choices: [
				{name: 'assemble-contrib-permalinks'},
				{name: 'assemble-contrib-sitemap'},
				{name: 'assemble-related-pages'}
			]
		},
		{
			when: function (answers) {
				return answers.templateEngine
					&& answers.templateEngine.length
					&& answers.templateEngine.indexOf('assemble') !== -1;
			},
			type: 'confirm',
			message: 'Do you want to use Extended Layouts in Assemble?',
			name: 'installExtendedLayout',
			default: true
		}
	];
};

exports.setup = function () {
	this.templateEngine = this.config.get('templateEngine') || '';
};

exports.scaffold = function () {
	// add global assemble files
	if (this.templateEngine && this.templateEngine !== '') {
		this.mkdir('resources/templating');
		this.copy('resources/templating/data/config.json');
		this.directory('resources/templating/ajax', 'resources/templating/ajax');
		this.directory('resources/templating/helpers', 'resources/templating/helpers');
		this.template('resources/templating/layouts/lyt-default.hbs.ejs', 'resources/templating/layouts/lyt-default.hbs');
		this.template('resources/templating/pages/index.hbs.ejs', 'resources/templating/pages/index.hbs');
		this.template('resources/templating/pages/page-components.hbs.ejs', 'resources/templating/pages/page-components.hbs');

		// Add global partials
		this.mkdir('resources/templating/partials');
		this.copy('resources/templating/partials/_global/_metadata.hbs');
		this.template('resources/templating/partials/_global/_scripts.hbs.ejs', 'resources/templating/partials/_global/_scripts.hbs');
		this.copy('resources/templating/partials/_global/_styles.hbs', 'resources/templating/partials/_global/_styles.hbs');

		// Add HTML build task for gulp
		if (this.taskRunner.indexOf('gulp') !== -1) this.template('helpers/_gulp/_html.js.ejs', 'helpers/_gulp/html.js');

		if (this.templateEngine.indexOf('assemble') !== -1) {
			// Add Gruntfile-helper file
			this.copy('helpers/_grunt/_assemble.js.ejs', 'helpers/_grunt/assemble.js');
		}

		if (this.templateEngine.indexOf('mangony') !== -1) {
			// Add Gruntfile-helper file
			this.copy('helpers/_grunt/_mangony.js.ejs', 'helpers/_grunt/mangony.js');
		}
	}
};