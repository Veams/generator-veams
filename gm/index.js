'use strict';
var util = require('util');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

var GMGenerator = module.exports = function GMGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.Base.apply(this, arguments);

};

util.inherits(GMGenerator, yeoman.generators.NamedBase);

GMGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	console.log(
		('\n') + chalk.bgMagenta('Install your grunt modules') + ('\n') +
			('\n') + chalk.magenta('* Be sure you know what you do') + ('\n') +
			('\n') + chalk.magenta('1. Choose your module in the following list') +
			('\n') + chalk.magenta('2. Install your module via "npm i <grunt-module-name> --save-dev"') +
			('\n') + chalk.magenta('3. Additional add your custom grunt task in your Gruntfile.js') + ('\n')
	);

	var questions = [];

	questions.push({
		name: "modules",
		type: "checkbox",
		message: "Which grunt modules do you want to use?",
		choices: [
			{ name: "grunt-grunticon"},
			{ name: "grunt-data-separator"},
			{ name: "dr-grunt-svg-sprites" },
			{ name: "grunt-packager"},
			{ name: "grunt-combine-media-queries"},
			{ name: "grunt-bless"},
			{ name: "grunt-browser-sync"},
			{ name: "grunt-autoprefixer"},
			{ name: "grunt-contrib-compass" },
			{ name: "grunt-photobox"},
			{ name: "grunt-accessibility"},
			{ name: "grunt-devtools"},
			{ name: "grunt-connect-proxy (CORS, Basic Auth and http methods)", value: "grunt-connect-proxy"}
		],
		default: this.config.get("modules")
	});

	questions.push({
		when: function (answers) {
			return     answers.modules
				&& answers.modules.length > 0
				&& answers.modules.indexOf('grunt-connect-proxy') !== -1;
		},
		type: 'input',
		name: 'proxyHost',
		validate: function (answer) {
			if (typeof answer !== 'string' || answer.length < 5 || answer.indexOf('.') === -1) {
				return false;
			} else {
				return true;
			}
		},
		message: 'Which host do you want me to proxy (e.g. domain.com)?',
		default: this.config.get("proxyHost")
	});

	questions.push({
		when: function (answers) {
			return     answers.modules
				&& answers.modules.length > 0
				&& answers.modules.indexOf('grunt-connect-proxy') !== -1
				&& answers.proxyHost;
		},
		type: 'input',
		name: 'proxyPort',
		validate: function (answer) {
			if (isNaN(Number(answer))) {
				return false;
			} else {
				return true;
			}
		},
		message: 'Which port should be used for the proxy?',
		default: this.config.get("proxyPort")
	});

	this.prompt(questions, function (answers) {
		this.modules = answers.modules;

		//save config to .yo-rc.json
		this.config.set(answers);

		cb();
	}.bind(this));

};

/**
 * Grunt modules file generation
 *
 */
GMGenerator.prototype.appGruntModules = function appGruntModules() {
// Grunt modules are splitted up in separate files and modules
	if (this.modules && this.modules.length > 0) {
		if (this.modules.indexOf('grunt-grunticon') != -1) {
			this.directory('../../app/templates/resources/scss/icons', 'resources/scss/icons');
			this.directory('../../app/templates/helpers/templates/grunticon', 'helpers/templates/grunticon');
			this.copy('../../app/templates/helpers/_grunt/grunticon.js', 'helpers/_grunt/grunticon.js');
			if (this.features && this.features.length > 0) {
				if (this.features.indexOf('sassInsteadOfCompass') != -1) {
					this.copy('../../app/templates/templates/helpers/_grunt/replaceSass.js', 'helpers/_grunt/replace.js');
				} else {
					this.copy('../../app/templates/helpers/_grunt/replace.js', 'helpers/_grunt/replace.js');
				}
			} else {
				this.copy('../../app/templates/helpers/_grunt/replace.js', 'helpers/_grunt/replace.js');
			}
		}
		if (this.modules.indexOf('grunt-data-separator') != -1) {
			this.copy('../../app/templates/helpers/_grunt/dataSeparator.js', 'helpers/_grunt/dataSeparator.js');
		}
		if (this.modules.indexOf('dr-grunt-svg-sprites') != -1) {
			this.mkdir('resources/scss/icons');
			this.copy('../../app/templates/helpers/_grunt/svg-sprites.js', 'helpers/_grunt/svg-sprites.js');
		}
		if (this.modules.indexOf('grunt-packager') != -1) {
			this.copy('../../app/templates/resources/js/project.jspackcfg', 'resources/js/project.jspackcfg');
			this.copy('../../app/templates/helpers/_grunt/packager.js', 'helpers/_grunt/packager.js');
		}
		if (this.modules.indexOf('grunt-combine-media-queries') != -1) {
			this.copy('../../app/templates/helpers/_grunt/cmq.js', 'helpers/_grunt/cmq.js');
		}
		if (this.modules.indexOf('grunt-bless') != -1) {
			this.copy('../../app/templates/helpers/_grunt/bless.js', 'helpers/_grunt/bless.js');
		}
		if (this.modules.indexOf('grunt-contrib-compass') != -1) {
			this.copy('../../app/templates/helpers/_grunt/compass.js', 'helpers/_grunt/compass.js');
		}
		if (this.modules.indexOf('grunt-browser-sync') != -1) {
			this.copy('../../app/templates/helpers/_grunt/browser_sync.js', 'helpers/_grunt/browser_sync.js');
		}
		if (this.modules.indexOf('grunt-photobox') != -1) {
			this.copy('../../app/templates/helpers/_grunt/photobox.js', 'helpers/_grunt/photobox.js');
		}
		if (this.modules.indexOf('grunt-autoprefixer') != -1) {
			this.copy('../../app/templates/helpers/_grunt/autoprefixer.js', 'helpers/_grunt/autoprefixer.js');
		}
		if (this.modules.indexOf('grunt-accessibility') != -1) {
			this.copy('../../app/templates/helpers/_grunt/accessibility.js', 'helpers/_grunt/accessibility.js');
		}
	}
};