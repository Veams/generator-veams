'use strict';
var util = require('util');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

var GMGenerator = module.exports = function GMGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.Base.apply(this, arguments);

	this.config.defaults({
		modules: [],
		features: [],
		jsLibs: [],
		cssLibs: [],
		installProxy: false,
		proxyHost: '0.0.0.0 ',
		proxyPort: 80,
		author: {
			name: "",
			login: "",
			email: ""
		}
	});

};

util.inherits(GMGenerator, yeoman.generators.NamedBase);

GMGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	console.log(
		('\n') + chalk.bgMagenta('Install your grunt modules') + ('\n') +
			('\n') + chalk.magenta('* Be sure you know what you do') +
			('\n') + chalk.magenta('Additional add your custom grunt task in your Gruntfile.js') + ('\n')
	);

	var questions = [];

	questions.push({
		name: "modules",
		type: "checkbox",
		message: "Which grunt modules do you want to use?",
		choices: [
			{ name: "grunt-accessibility"},
			{ name: "grunt-autoprefixer"},
			{ name: "grunt-bless"},
			{ name: "grunt-browser-sync"},
			{ name: "grunt-combine-media-queries"},
			{ name: "grunt-contrib-compass" },
			{ name: "grunt-contrib-htmlmin"},
			{ name: "grunt-contrib-uglify"},
			{ name: "grunt-csscomb"},
			{ name: "grunt-data-separator"},
			{ name: "grunt-devtools"},
			{ name: "dr-grunt-svg-sprites" },
			{ name: "grunt-grunticon"},
			{ name: "grunt-jsbeautifier"},
			{ name: "grunt-modernizr"},
			{ name: "grunt-packager"},
			{ name: "grunt-phantomas"},
			{ name: "grunt-photobox"},
			{ name: "grunt-svgmin"},
			{
				name: "Libsass Globbing",
				value: "sass-globbing"
			}
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

		this.features = this.config.get("features");
		this.jsLibs = this.config.get("jsLibs");
		this.cssLibs = this.config.get("cssLibs");

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
	var done = this.async();

// Grunt modules are splitted up in separate files and modules
	if (this.modules && this.modules.length > 0) {
		if (this.modules.indexOf('grunt-autoprefixer') != -1) {
			this.copy('../../app/templates/helpers/_grunt/autoprefixer.js', 'helpers/_grunt/autoprefixer.js');
			this.npmInstall(['grunt-autoprefixer'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('grunt-accessibility') != -1) {
			this.copy('../../app/templates/helpers/_grunt/accessibility.js', 'helpers/_grunt/accessibility.js');
			this.npmInstall(['grunt-accessibility'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('grunt-bless') != -1) {
			this.copy('../../app/templates/helpers/_grunt/bless.js', 'helpers/_grunt/bless.js');
			this.npmInstall(['grunt-bless'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('grunt-browser-sync') != -1) {
			this.template('../../app/templates/helpers/_grunt/_browserSync.js', 'helpers/_grunt/browserSync.js');
			this.npmInstall(['grunt-browser-sync'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('grunt-combine-media-queries') != -1) {
			this.copy('../../app/templates/helpers/_grunt/cmq.js', 'helpers/_grunt/cmq.js');
			this.npmInstall(['grunt-combine-media-queries'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('grunt-contrib-compass') != -1) {
			this.copy('../../app/templates/helpers/_grunt/compass.js', 'helpers/_grunt/compass.js');
			this.npmInstall(['grunt-contrib-compass'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('grunt-contrib-htmlmin') != -1) {
			this.copy('../../app/templates/helpers/_grunt/htmlmin.js', 'helpers/_grunt/htmlmin.js');
			this.npmInstall(['grunt-contrib-htmlmin'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('grunt-contrib-uglify') != -1) {
			this.template('../../app/templates/helpers/_grunt/_uglify.js', 'helpers/_grunt/uglify.js');
			this.npmInstall(['grunt-contrib-uglify'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('grunt-csscomb') != -1) {
			this.directory('../../app/templates/helpers/csscomb', 'helpers/csscomb');
			this.copy('../../app/templates/helpers/_grunt/csscomb.js', 'helpers/_grunt/csscomb.js');
			this.npmInstall(['grunt-csscomb'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('grunt-data-separator') != -1) {
			this.copy('../../app/templates/helpers/_grunt/dataSeparator.js', 'helpers/_grunt/dataSeparator.js');
			this.npmInstall(['grunt-data-separator'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('dr-grunt-svg-sprites') != -1) {
			this.mkdir('resources/scss/icons');
			this.copy('../../app/templates/helpers/_grunt/svg-sprites.js', 'helpers/_grunt/svg-sprites.js');
			this.npmInstall(['dr-grunt-svg-sprites'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('grunt-grunticon') != -1) {
			this.directory('../../app/templates/resources/scss/icons', 'resources/scss/icons');
			this.directory('../../app/templates/helpers/templates/grunticon', 'helpers/templates/grunticon');
			this.copy('../../app/templates/helpers/_grunt/grunticon.js', 'helpers/_grunt/grunticon.js');
			this.npmInstall(['grunt-grunticon'], { 'saveDev': true }, done);

			if (this.features && this.features.length > 0) {
				if (this.features.indexOf('sassInsteadOfCompass') != -1) {
					this.copy('../../app/templates/templates/helpers/_grunt/replaceSass.js', 'helpers/_grunt/replace.js');
					this.npmInstall(['grunt-replace'], { 'saveDev': true }, done);

				} else {
					this.copy('../../app/templates/helpers/_grunt/replace.js', 'helpers/_grunt/replace.js');
					this.npmInstall(['grunt-replace'], { 'saveDev': true }, done);

				}
			} else {
				this.copy('../../app/templates/helpers/_grunt/replace.js', 'helpers/_grunt/replace.js');
				this.npmInstall(['grunt-replace'], { 'saveDev': true }, done);
			}
		}
		if (this.modules.indexOf('grunt-jsbeautifier') != -1) {
			this.copy('../../app/templates/helpers/_grunt/jsbeautifier.js', 'helpers/_grunt/jsbeautifier.js');
			this.copy('../../app/templates/helpers/configs/.jsbeautifierrc', 'helpers/configs/.jsbeautifierrc');
			this.npmInstall(['grunt-jsbeautifier'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('grunt-modernizr') != -1) {
			this.copy('../../app/templates/helpers/_grunt/modernizr.js', 'helpers/_grunt/modernizr.js');
			this.npmInstall(['grunt-modernizr'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('grunt-packager') != -1) {
			this.copy('../../app/templates/resources/js/project.jspackcfg', 'resources/js/project.jspackcfg');
			this.copy('../../app/templates/helpers/_grunt/packager.js', 'helpers/_grunt/packager.js');
			this.npmInstall(['grunt-packager'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('grunt-phantomas') != -1) {
			this.copy('../../app/templates/helpers/_grunt/phantomas.js', 'helpers/_grunt/phantomas.js');
			this.npmInstall(['grunt-phantomas'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('grunt-photobox') != -1) {
			this.copy('../../app/templates/helpers/_grunt/photobox.js', 'helpers/_grunt/photobox.js');
			this.npmInstall(['grunt-photobox'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('grunt-svgmin') != -1) {
			this.copy('../../app/templates/helpers/_grunt/svgmin.js', 'helpers/_grunt/svgmin.js');
			this.npmInstall(['grunt-svgmin'], { 'saveDev': true }, done);
		}
		if (this.modules.indexOf('sass-globbing') != -1) {
			this.template('../../app/templates/helpers/_grunt/_fileindex.js', 'helpers/_grunt/fileindex.js');
			this.npmInstall(['grunt-fileindex'], { 'saveDev': true }, done);

			console.log(('\n') + chalk.bgRed('Please add the following tasks to your watch.js file') + ('\n') + ('\n') +
				chalk.yellow('\n globbing: {') +
				chalk.yellow('\n     options: {') +
				chalk.yellow('\n         event: ["added", "deleted"]') +
				chalk.yellow('\n     },') +
				chalk.yellow('\n     files: [') +
				chalk.yellow('\n         "<%= paths.helper %>/_grunt/fileindex.js",') +
				chalk.yellow('\n         "<%= paths.src %>/scss/**/*.scss",') +
				chalk.yellow('\n         "!<%= paths.src %>/scss/_all.scss"') +
				chalk.yellow('\n     ],') +
				chalk.yellow('\n     tasks: "fileindex:libsassGlobbing"') +
				chalk.yellow('\n },') +
				chalk.yellow('\n fileindex: {') +
				chalk.yellow('\n     files: [') +
				chalk.yellow('\n         "<%= paths.helper %>/_grunt/fileindex.js"') +
				chalk.yellow('\n     ],') +
				chalk.yellow('\n     tasks: "fileindex:libsassGlobbing"') +
				chalk.yellow('\n }' + ('\n') + ('\n'))
			);
		}
	}
};