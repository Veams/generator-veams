'use strict';
var util = require('util');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

var GruntGenerator = module.exports = function GruntGenerator(args, options, config) {
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

util.inherits(GruntGenerator, yeoman.generators.NamedBase);

GruntGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	console.log(
		('\n') + chalk.bgMagenta('Install your grunt modules') + ('\n') +
		('\n') + chalk.magenta('* Be sure you know what you do') +
		('\n') + chalk.magenta('Additional add your custom grunt task in your Gruntfile.js') + ('\n')
	);

	var questions = [];

	questions.push({
		name: "path",
		message: "Where do you have your task files?",
		default: "helpers/_grunt"
	});

	questions.push({
		name: "modules",
		type: "checkbox",
		message: "Which grunt modules do you want to use?",
		choices: [
			{name: "grunt-accessibility"},
			{name: "grunt-autoprefixer"},
			{name: "grunt-bless"},
			{name: "grunt-browser-sync"},
			{name: "grunt-combine-media-queries"},
			{name: "grunt-contrib-compass"},
			{name: "grunt-contrib-htmlmin"},
			{name: "grunt-contrib-requirejs"},
			{name: "grunt-contrib-uglify"},
			{name: "grunt-csscomb"},
			{name: "grunt-data-separator"},
			{name: "grunt-devtools"},
			{name: "grunt-dr-svg-sprites"},
			{name: "grunt-grunticon"},
			{name: "grunt-jsbeautifier"},
			{name: "grunt-jsdoc"},
			{name: "grunt-modernizr"},
			{name: "grunt-packager"},
			{name: "grunt-phantomas"},
			{name: "grunt-photobox"},
			{name: "grunt-responsive-images"},
			{name: "grunt-sass"},
			{name: "grunt-svgmin"},
			{name: "grunt-version"},
			{
				name: "Libsass Globbing",
				value: "sass-globbing"
			}
		],
		default: this.config.get("modules")
	});

	questions.push({
		when: function (answers) {
			return answers.modules
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
			return answers.modules
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
		this.path = answers.path;
		if (this.path !== '') {
			this.path = this.path.replace(/\/?$/, '/');
		}

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
GruntGenerator.prototype.appGruntModules = function appGruntModules() {
	var done = this.async();
	var root = '../../app/templates/helpers/_grunt/';

// Grunt modules are splitted up in separate files and modules
	if (this.modules && this.modules.length > 0) {
		if (this.modules.indexOf('grunt-autoprefixer') != -1) {
			this.copy(root + 'autoprefixer.js', this.path + 'autoprefixer.js');
			this.npmInstall(['grunt-autoprefixer'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-accessibility') != -1) {
			this.copy(root + 'accessibility.js', this.path + 'accessibility.js');
			this.npmInstall(['grunt-accessibility'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-bless') != -1) {
			this.copy(root + 'bless.js', this.path + 'bless.js');
			this.npmInstall(['grunt-bless'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-browser-sync') != -1) {
			this.template(root + '_browserSync.js', this.path + 'browserSync.js');
			this.npmInstall(['grunt-browser-sync'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-combine-media-queries') != -1) {
			this.copy(root + 'cmq.js', this.path + 'cmq.js');
			this.npmInstall(['grunt-combine-media-queries'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-contrib-compass') != -1) {
			this.copy(root + 'compass.js', this.path + 'compass.js');
			this.npmInstall(['grunt-contrib-compass'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-contrib-htmlmin') != -1) {
			this.copy(root + 'htmlmin.js', this.path + 'htmlmin.js');
			this.npmInstall(['grunt-contrib-htmlmin'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-contrib-requirejs') != -1) {
			this.copy(root + 'requirejs.js', this.path + 'requirejs.js');
			this.bowerInstall(['almond'], {'save': true});
			this.npmInstall(['grunt-contrib-requirejs'], {'save': true}, done);
		}
		if (this.modules.indexOf('grunt-contrib-uglify') != -1) {
			this.template(root + '_uglify.js', this.path + 'uglify.js');
			this.npmInstall(['grunt-contrib-uglify'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-csscomb') != -1) {
			this.directory('../../app/templates/helpers/csscomb', 'helpers/csscomb');
			this.copy(root + 'csscomb.js', this.path + 'csscomb.js');
			this.npmInstall(['grunt-csscomb'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-data-separator') != -1) {
			this.copy(root + 'dataSeparator.js', this.path + 'dataSeparator.js');
			this.npmInstall(['grunt-data-separator'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-dr-svg-sprites') != -1) {
			this.mkdir('resources/scss/icons');
			this.template(root + '_svg-sprites.js', this.path + 'svg-sprites.js');
			this.bowerInstall(['pg-scss'], {'save': true});
			this.npmInstall(['grunt-dr-svg-sprites'], {'saveDev': true}, done);

			console.log(('\n') + chalk.bgRed('Please add the following line to your Gruntfile.js file in line 22 (require())') + ('\n') +
				chalk.yellow('\n "svg-sprites": "grunt-dr-svg-sprites"') + ('\n') +
				chalk.bgRed('\n Please add the following lines to your Gruntfile.js to your custom tasks:') + ('\n') +
				chalk.yellow('\n grunt.registerTask(\'sprites\', [') +
				chalk.yellow('\n    \'svg-sprites\',') +
				chalk.yellow('\n    \'replace:spriteUrl\'' +
				chalk.yellow('\n ]);') + ('\n') + ('\n'))
			);
		}
		if (this.modules.indexOf('grunt-grunticon') != -1) {
			this.directory('../../app/templates/helpers/resources/scss/icons', 'resources/scss/icons');
			this.directory('../../app/templates/helpers/templates/grunticon-template', 'helpers/templates/grunticon-template');
			this.template(root + '_grunticon.js', this.path + 'grunticon.js');
			this.bowerInstall(['pg-scss'], {'save': true});
			this.npmInstall(['grunt-grunticon'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-jsbeautifier') != -1) {
			this.copy(root + 'jsbeautifier.js', this.path + 'jsbeautifier.js');
			this.copy('../../app/templates/helpers/configs/.jsbeautifierrc', 'helpers/configs/.jsbeautifierrc');
			this.npmInstall(['grunt-jsbeautifier'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-jsdoc') != -1 || (this.features && this.features.length > 0 && this.features.indexOf('installDocs') != -1)) {
			this.copy(root + 'jsdoc.js', this.path + 'jsdoc.js');
			this.npmInstall(['grunt-jsdoc@beta'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-modernizr') != -1) {
			this.copy(root + 'modernizr.js', this.path + 'modernizr.js');
			this.npmInstall(['grunt-modernizr'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-packager') != -1) {
			this.copy('../../app/templates/resources/js/project.jspackcfg', 'resources/js/project.jspackcfg');
			this.copy(root + 'packager.js', this.path + 'packager.js');
			this.npmInstall(['grunt-packager'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-phantomas') != -1) {
			this.copy(root + 'phantomas.js', this.path + 'phantomas.js');
			this.npmInstall(['grunt-phantomas'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-photobox') != -1) {
			this.template(root + '_photobox.js', this.path + 'photobox.js');
			this.npmInstall(['grunt-photobox'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-responsive-images') != -1) {
			this.copy(root + 'responsive_images.js', this.path + 'responsive_images.js');
			this.npmInstall(['grunt-responsive-images'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-sass') != -1) {
			this.template(root + '_sass.js', this.path + 'sass.js');
			this.npmInstall(['grunt-sass'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-svgmin') != -1) {
			this.copy(root + 'svgmin.js', this.path + 'svgmin.js');
			this.npmInstall(['grunt-svgmin'], {'saveDev': true}, done);
		}
		if (this.modules.indexOf('grunt-version') != -1) {
			this.copy(root + 'version.js', this.path + 'version.js');
			this.copy('../../app/templates/resources/templates/partials/blocks/b-version.hbs', 'resources/templates/partials/blocks/b-version.hbs');
			this.npmInstall(['grunt-version'], {'saveDev': true}, done);
		}

		if (this.modules.indexOf('sass-globbing') != -1) {
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

		if (this.modules.indexOf('sass-globbing') != -1 || this.modules.indexOf('grunt-responsive-images') != -1) {
			this.template(root + '_fileindex.js', this.path + 'fileindex.js');
			this.npmInstall(['grunt-fileindex'], {'saveDev': true}, done);
		}

		if (this.modules.indexOf('grunt-grunticon') != -1 || this.modules.indexOf('grunt-dr-svg-sprites') != -1) {
			this.template(root + '_replace.js', this.path + 'replace.js');
			this.npmInstall(['grunt-text-replace'], {'saveDev': true}, done);
		}
	}
};