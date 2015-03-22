'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

	// Initialize general settings and store some files
	initializing: function () {
		this.config.defaults({
			modules: [],
			features: [],
			jsLibs: [],
			cssLibs: [],
			pgPackages: [],
			installProxy: false,
			proxyHost: '0.0.0.0 ',
			proxyPort: 80,
			author: {
				name: "",
				login: "",
				email: ""
			}
		});
	},

	// Custom prompts routine
	prompting: function () {
		console.log(
			('\n') + chalk.bgMagenta('Install your grunt modules') + ('\n') +
			('\n') + chalk.magenta('* Be sure you know what you do') +
			('\n') + chalk.magenta('Additional add your custom grunt task in your Gruntfile.js') + ('\n')
		);

		var questions = [];
		var cb = this.async();

		questions.push({
			name: "helperPath",
			message: "Where do you have your task files?",
			default: "helpers/_grunt"
		});

		questions.push({
			name: "srcPath",
			message: "Where do you have your source files?",
			default: "resources"
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
				{name: "grunt-combine-mq"},
				{name: "grunt-contrib-compass"},
				{name: "grunt-contrib-htmlmin"},
				{name: "grunt-contrib-requirejs"},
				{name: "grunt-contrib-uglify"},
				{name: "grunt-csscomb"},
				{name: "grunt-dr-svg-sprites"},
				{name: "grunt-grunticon"},
				{name: "grunt-image-size-export"},
				{name: "grunt-jsbeautifier"},
				{name: "grunt-jsdoc"},
				{name: "grunt-modernizr"},
				{name: "grunt-packager"},
				{name: "grunt-phantomas"},
				{name: "grunt-photobox"},
				{name: "grunt-postcss-separator"},
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
			this.helperPath = answers.helperPath;
			if (this.helperPath !== '') {
				this.helperPath = this.helperPath.replace(/\/?$/, '/');
			}
			this.srcPath = answers.srcPath;
			if (this.srcPath !== '') {
				this.srcPath = this.srcPath.replace(/\/?$/, '/');
			}

			this.modules = answers.modules;
			this.features = this.config.get("features");
			this.jsLibs = this.config.get("jsLibs");
			this.cssLibs = this.config.get("cssLibs");
			this.pgPackages = this.config.get("pgPackages");

			//save config to .yo-rc.json
			this.config.set(answers);

			cb();
		}.bind(this));

	},

	/**
	 * Grunt modules file generation
	 *
	 */
	writing: {
		grunt: function () {
			var helpers = '../../app/templates/helpers/';
			var root = '../../app/templates/helpers/_grunt/';
			var src = '../../app/templates/resources/';

			// Grunt modules are splitted up in separate files and modules
			if (this.modules && this.modules.length) {
				if (this.modules.indexOf('grunt-autoprefixer') != -1) {
					this.copy(root + 'autoprefixer.js', this.helperPath + 'autoprefixer.js');

					this.npmInstall(['grunt-autoprefixer'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-accessibility') != -1) {
					this.copy(root + 'accessibility.js', this.helperPath + 'accessibility.js');

					this.npmInstall(['grunt-accessibility'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-bless') != -1) {
					this.copy(root + 'bless.js', this.helperPath + 'bless.js');

					this.npmInstall(['grunt-bless'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-browser-sync') != -1) {
					this.template(root + '_browserSync.js.ejs', this.helperPath + 'browserSync.js');

					this.npmInstall(['grunt-browser-sync'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-combine-mq') != -1) {
					this.copy(root + 'combine_mq.js', this.helperPath + 'combine_mq.js');

					this.npmInstall(['grunt-combine-mq'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-contrib-compass') != -1) {
					this.copy(root + 'compass.js', this.helperPath + 'compass.js');

					this.npmInstall(['grunt-contrib-compass'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-contrib-htmlmin') != -1) {
					this.copy(root + 'htmlmin.js', this.helperPath + 'htmlmin.js');

					this.npmInstall(['grunt-contrib-htmlmin'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-contrib-requirejs') != -1) {
					this.copy(root + 'requirejs.js', this.helperPath + 'requirejs.js');

					this.bowerInstall(['almond'], {'save': true});
					this.npmInstall(['grunt-contrib-requirejs'], {'save': true});
				}
				if (this.modules.indexOf('grunt-contrib-uglify') != -1) {
					this.template(root + 'uglify.js', this.helperPath + 'uglify.js');

					this.npmInstall(['grunt-contrib-uglify'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-csscomb') != -1) {
					this.directory(helpers + 'csscomb', 'helpers/csscomb');
					this.copy(root + 'csscomb.js', this.helperPath + 'csscomb.js');

					this.npmInstall(['grunt-csscomb'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-dr-svg-sprites') != -1) {
					this.mkdir('resources/scss/icons');
					this.template(root + '_svg-sprites.js.ejs', this.helperPath + 'svg-sprites.js');
					this.copy(helpers + 'templates/svg-sprites/stylesheet.hbs', 'helpers/templates/svg-sprites/stylesheet.hbs');

					this.npmInstall(['grunt-dr-svg-sprites'], {'saveDev': true});

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
					this.directory(helpers + 'templates/grunticon-template', 'helpers/templates/grunticon-template');
					this.template(root + '_grunticon.js.ejs', this.helperPath + 'grunticon.js');
					this.copy(src + 'js/vendor/loadCSS.js', this.srcPath + 'js/vendor/loadCSS.js');

					this.bowerInstall(['pg-scss'], {'save': true});
					this.npmInstall(['grunt-grunticon'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-image-size-export') != -1) {
					this.copy(root + 'imageSizeExport.js', this.helperPath + 'imageSizeExport.js');
				}
				if (this.modules.indexOf('grunt-jsbeautifier') != -1) {
					this.copy(root + 'jsbeautifier.js', this.helperPath + 'jsbeautifier.js');
					this.copy(helpers + 'configs/.jsbeautifierrc', 'helpers/configs/.jsbeautifierrc');

					this.npmInstall(['grunt-jsbeautifier'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-jsdoc') != -1 || (this.features && this.features.length > 0 && this.features.indexOf('installDocs') != -1)) {
					this.copy(root + 'jsdoc.js', this.helperPath + 'jsdoc.js');

					this.npmInstall(['grunt-jsdoc@beta'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-modernizr') != -1) {
					this.copy(root + 'modernizr.js', this.helperPath + 'modernizr.js');

					this.npmInstall(['grunt-modernizr'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-packager') != -1) {
					this.copy(src + 'js/project.jspackcfg', this.srcPath + 'js/project.jspackcfg');
					this.copy(root + 'packager.js', this.helperPath + 'packager.js');

					this.npmInstall(['grunt-packager'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-phantomas') != -1) {
					this.copy(root + 'phantomas.js', this.helperPath + 'phantomas.js');

					this.npmInstall(['grunt-phantomas'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-photobox') != -1) {
					this.template(root + 'photobox.js', this.helperPath + 'photobox.js');

					this.npmInstall(['grunt-photobox'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-postcss-separator') != -1) {
					this.copy(root + '_separator.js.ejs', this.helperPath + 'separator.js');
				}
				if (this.modules.indexOf('grunt-responsive-images') != -1) {
					this.copy(root + 'responsive_images.js', this.helperPath + 'responsive_images.js');

					this.npmInstall(['grunt-responsive-images'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-sass') != -1) {
					this.template(root + '_sass.js.ejs', this.helperPath + 'sass.js');

					this.npmInstall(['grunt-sass'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-svgmin') != -1) {
					this.copy(root + 'svgmin.js', this.helperPath + 'svgmin.js');

					this.npmInstall(['grunt-svgmin'], {'saveDev': true});
				}
				if (this.modules.indexOf('grunt-version') != -1) {
					this.copy(root + 'version.js', this.helperPath + 'version.js');
					this.copy(src + 'templates/partials/blocks/b-version.hbs', this.srcPath + 'templates/partials/blocks/b-version.hbs');

					this.npmInstall(['grunt-version'], {'saveDev': true});
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
					this.template(root + '_fileindex.js.ejs', this.helperPath + 'fileindex.js');

					this.npmInstall(['grunt-fileindex'], {'saveDev': true});
				}

				if (this.modules.indexOf('grunt-grunticon') != -1 || this.modules.indexOf('grunt-dr-svg-sprites') != -1) {
					this.template(root + '_replace.js.ejs', this.helperPath + 'replace.js');

					this.npmInstall(['grunt-text-replace'], {'saveDev': true});
				}
			}
		}
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install'] || this.options['s'],
			skipMessage: this.options['skip-welcome-message'] || this.options['w']
		});
	}
});