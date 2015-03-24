'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');


module.exports = yeoman.generators.Base.extend({

	// Initialize general settings and store some files
	initializing: function () {
		this.pkg = require('../../package.json');
		this.pkgFile = this.src.read['_package.json'];
		this.bowerFile = this.src.readJSON('_bower.json');

		this.dotFiles = [
			'gitignore',
			'gitattributes',
			'editorconfig',
			'bowerrc',
			'jshintrc'
		];

		//
		this.config.defaults({
			projectName: "",
			projectAuthor: "",
			installAssemble: "",
			installPlugin: false,
			modules: [
				"grunt-combine-mq",
				"grunt-dr-svg-sprites"
			],
			features: [
				"sassInsteadOfCompass"
			],
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

	selectRoutine: function () {
		var cb = this.async();
		var force = false;
		var prompts = [];

		// welcome message
		var welcome =
			chalk.cyan('\n               \'coxOOOOkdl;.             ') +
			chalk.cyan('\n           ,lkKXXXXXXXXXXXXXOd;.         ') +
			chalk.cyan('\n        \'dKXXXXXXX0OOOO0KXXXXXXXk:       ') +
			chalk.cyan('\n      ;OXXXXKkl,.        .\'cd0XXXX0l.    ') +
			chalk.cyan('\n    .kXXXX0c.                 ,kXXXX0;   ') +
			chalk.cyan('\n   ,KXXX0:                      \'kXXXXo  ') + chalk.cyan('*  http://prototype-generator.com *') +
			chalk.cyan('\n  \'KXXXO.                         oXXXXo ') +
			chalk.cyan('\n  OXXX0.                           dXXXX,') +
			chalk.cyan('\n :XXXX:                            .KXXXx') + chalk.yellow('    Welcome ladies and gentlemen!') +
			chalk.cyan('\n dXXXK.  .::::::::::::::::::.       dXXXK') + chalk.yellow('    Want to make your life easy???') +
			chalk.cyan('\n dXXXK   ,XXXXXXXXXXXXXXXXXX\'       oXXXX') +
			chalk.cyan('\n dXXXK   ,XXXXXKKKKKKKKKKKKX\'       OXXXO') + chalk.red('    Be sure you have installed') +
			chalk.cyan('\n dXXXK   ,XXXXd                    ;XXXXl') + chalk.red('     * bower:  http://bower.io/') +
			chalk.cyan('\n dXXXK   ,XXXXd                   \'KXXXO ') + chalk.red('     * grunt:  http://gruntjs.com ') +
			chalk.cyan('\n dXXXK   ,XXXXd                  cKXXXO. ') +
			chalk.cyan('\n dXXXK   ,XXXXd                :OXXXXx.  ') +
			chalk.cyan('\n dXXXK   ,XXXXx            .;dKXXXXO;    ') +
			chalk.cyan('\n dXXXK   ,XXXXX0xoc:;;:clxOXXXXXXO:      ') +
			chalk.cyan('\n dXXXK    ;dOXXXXXXXXXXXXXXXXKxc.        ') +
			chalk.cyan('\n dXXXK       .,:ldkOOOOkxoc;.            ') +
			chalk.cyan('\n lOOOx                                   ') +
			('\n ');

		if (!this.options['skip-welcome-message']) {
			console.log(welcome);
		}

		if (!this.config.existed) {
			force = true;
		}

		(!this.config.get("defaultInstall") || force) && prompts.push({
			name: "defaultInstall",
			type: "list",
			message: "Choose your installation routine:",
			choices: [
				{
					name: 'Minimal Installation',
					value: 'stdInstall'
				},
				{
					name: 'Custom Installation',
					value: 'customInstall'
				}
			],
			default: this.config.get("defaultInstall")
		});

		this.prompt(prompts, function (answers) {

			this.defaultInstall = answers.defaultInstall || this.config.get("defaultInstall");

			//save config to .yo-rc.json
			if (this.defaultInstall === 'stdInstall') {
				console.log(
					('\n') + chalk.bgCyan('Standard installation routine selected.') + ('\n')
				);
				this.projectName = this.config.get("projectName");
				this.authorLogin = this.config.get("projectAuthor");
				this.installAssemble = this.config.set("installAssemble", true);
				this.plugin = this.config.get("plugin");
				this.modules = this.config.get("modules");
				this.features = this.config.get("features");
				this.jsLibs = this.config.get("jsLibs");
				this.cssLibs = this.config.get("cssLibs");
				this.pgPackages = this.config.get("pgPackages");
				this.authorName = this.config.get("author").name;
				this.authorEmail = this.config.get("author").email;
				this.proxyHost = this.config.get("proxyHost");
				this.proxyPort = this.config.get("proxyPort");

				//save config to .yo-rc.json
				this.config.set(answers);
				cb();
			} else {
				console.log(
					('\n') + chalk.green('Custom installation routine selected.') + ('\n')
				);
				this._prompting();
			}
		}.bind(this));
	},

	// Custom prompts routine
	_prompting: function () {
		var done = this.async();
		var force = false;
		var questions = [];

		if (!this.config.existed) {
			force = true;
		}

		(!this.config.get("projectName") || force) && questions.push({
			type: "input",
			name: "projectName",
			message: "Your project name",
			default: this.appname
		});

		(!this.config.get("projectAuthor") || force) && questions.push({
			type: "input",
			name: "projectAuthor",
			message: "Would you mind telling me your name?",
			default: this.config.get("projectAuthor")
		});

		(!this.config.get("installAssemble") || force) && questions.push({
			type: "confirm",
			name: "installAssemble",
			message: "Would you want to install assemble?",
			default: this.config.get("installAssemble")
		});

		(!this.config.get("installPlugin") || force) && questions.push({
			type: "confirm",
			name: "installPlugin",
			message: "Do you want to install assemble plugins?",
			default: this.config.get("installPlugin")
		});
		questions.push({
			name: "plugin",
			type: "checkbox",
			message: "Which assemble plugin do you want to use?",
			choices: [
				{name: "assemble-contrib-permalinks"},
				{name: "assemble-contrib-sitemap"},
				{name: "assemble-related-pages"}
			],
			when: function (answers) {
				return answers.installPlugin;
			}
		});


		(!this.config.get("modules") || force) && questions.push({
			name: "modules",
			type: "checkbox",
			message: "Which grunt modules do you want to use?",
			choices: [
				{name: "grunt-accessibility"},
				{name: "grunt-autoprefixer", checked: true},
				{name: "grunt-bless"},
				{name: "grunt-browser-sync", checked: true},
				{name: "grunt-combine-mq", checked: true},
				{name: "grunt-connect-proxy (CORS, Basic Auth and http methods)", value: "grunt-connect-proxy"},
				{name: "grunt-contrib-compass"},
				{name: "grunt-contrib-htmlmin"},
				{name: "grunt-contrib-requirejs"},
				{name: "grunt-contrib-uglify"},
				{name: "grunt-csscomb"},
				{name: "grunt-dr-svg-sprites", checked: true},
				{name: "grunt-grunticon"},
				{name: "grunt-image-size-export"},
				{name: "grunt-jsdoc"},
				{name: "grunt-modernizr"},
				{name: "grunt-packager"},
				{name: "grunt-phantomas"},
				{name: "grunt-photobox"},
				{name: "grunt-postcss-separator"},
				{name: "grunt-responsive-images"},
				{name: "grunt-svgmin"},
				{name: "grunt-version", checked: true}
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

		(!this.config.get("features") || force) && questions.push({
			name: "features",
			type: "checkbox",
			message: "Do you need anything special?",
			choices: [
				{
					name: 'Libsass instead of Compass',
					value: 'sassInsteadOfCompass',
					checked: true
				},
				{
					name: 'Extended Layout',
					value: 'installExtendedLayout',
					checked: true
				},
				{
					name: 'Dev-Output & Dist-Output?',
					value: 'createDevFolder',
					checked: true
				},
				{
					name: 'Create Developer Documentation',
					value: 'installDocs',
					checked: true
				}
			],
			default: this.config.get("features")
		});

		(!this.config.get("jsLibs") || force) && questions.push({
			name: "jsLibs",
			type: "checkbox",
			message: "Do you want to use any JS Libraries?",
			choices: [
				{
					name: 'jQuery (latest Version)',
					value: 'jquery',
					checked: false
				},
				{
					name: 'RequireJS',
					value: 'requirejs',
					checked: false
				},
				{
					name: 'BackboneJS',
					value: 'backbone',
					checked: false
				}
			],
			default: this.config.get("jsLibs")
		});

		(!this.config.get("cssLibs") || force) && questions.push({
			name: "cssLibs",
			type: "checkbox",
			message: "Do you want to use any CSS Frameworks?",
			choices: [
				{
					name: 'Foundation',
					value: 'foundation',
					checked: false
				},
				{
					name: 'Bourbon Neat',
					value: 'neat',
					checked: false
				},
				{
					name: 'SASS Bootstrap',
					value: 'sass-bootstrap',
					checked: false
				}
			],
			default: this.config.get("cssLibs")
		});

		(!this.config.get("pgPackages") || force) && questions.push({
			name: "pgPackages",
			type: "checkbox",
			message: "Do you want to use PG Packages (Bower Component)?",
			choices: [
				{
					name: 'PG Methodology',
					value: 'pgMethodology',
					checked: true
				},
				{
					name: 'PG SCSS Starter Kit',
					value: 'pgSCSS',
					checked: true
				},
				{
					name: 'PG JS Starter Kit',
					value: 'pgJS',
					checked: false
				},
				{
					name: 'PG Components',
					value: 'pgComponents',
					checked: false
				}
			],
			default: this.config.get("pgPackages")
		});

		this.prompt(questions, function (answers) {

			this.projectName = answers.projectName || this.config.get("projectName");
			this.authorLogin = answers.projectAuthor || this.config.get("projectAuthor");
			this.installAssemble = answers.installAssemble || this.config.get("installAssemble");
			this.plugin = answers.plugin;
			this.modules = answers.modules;
			this.features = answers.features;
			this.jsLibs = answers.jsLibs;
			this.cssLibs = answers.cssLibs;
			this.pgPackages = answers.pgPackages;
			this.authorName = this.config.get("author").name;
			this.authorEmail = this.config.get("author").email;
			this.proxyHost = answers.proxyHost;
			this.proxyPort = answers.proxyPort;

			//save config to .yo-rc.json
			this.config.set(answers);

			done();
		}.bind(this));
	},

	writing: {
		setup: function () {
			this.template('Gruntfile.js.ejs', 'Gruntfile.js');
			this.template('_package.json.ejs', 'package.json');
			this.template('README.md.ejs', 'README.md');
			this.copy('bowerrc', '.bowerrc');
			this.copy('gitignore', '.gitignore');

			this.bowerFile['name'] = this.config.get('projectName');
		},

		defaults: function () {
			// Copy standard files
			this.mkdir('helpers/_grunt');
			this.template('helpers/_grunt/clean.js', 'helpers/_grunt/clean.js');
			this.template('helpers/_grunt/_concurrent.js.ejs', 'helpers/_grunt/concurrent.js');
			this.template('helpers/_grunt/connect.js', 'helpers/_grunt/connect.js');
			this.copy('helpers/_grunt/cssmin.js', 'helpers/_grunt/cssmin.js');
			this.copy('helpers/_grunt/htmlhint.js', 'helpers/_grunt/htmlhint.js');
			this.copy('helpers/_grunt/jshint.js', 'helpers/_grunt/jshint.js');
			this.copy('helpers/_grunt/jsbeautifier.js', 'helpers/_grunt/jsbeautifier.js');
			this.copy('helpers/configs/.jsbeautifierrc', 'helpers/configs/.jsbeautifierrc');
			this.template('helpers/_grunt/_sync.js.ejs', 'helpers/_grunt/sync.js');
			this.template('helpers/_grunt/_watch.js.ejs', 'helpers/_grunt/watch.js');

			this.mkdir('_output');

			// add specific resources to make it possible to split up some directories
			this.mkdir('_output/js');
			this.mkdir('resources');
			this.mkdir('resources/ajax');
			this.mkdir('resources/assets');
			this.mkdir('resources/assets/img');
			this.mkdir('resources/assets/img/temp');
			this.mkdir('resources/assets/img/svg');
			this.mkdir('resources/assets/img/svg/icons');
			this.mkdir('resources/assets/fonts');
			this.mkdir('resources/assets/media');
			this.mkdir('resources/js');
			this.mkdir('resources/scss');
			this.mkdir('resources/scss/utils/extends');
			this.mkdir('resources/scss/utils/mixins');
			this.copy('resources/scss/global/_print.scss');
			this.copy('resources/scss/universal.scss');

			this.template('resources/scss/global/_base.scss.ejs', 'resources/scss/global/_base.scss');
			this.template('resources/scss/global/_vars.scss.ejs', 'resources/scss/global/_vars.scss');
			this.template('resources/scss/_styles.scss.ejs', 'resources/scss/styles.scss');
		},

		assemble: function () {
			// add global assemble files
			if (this.config.get("installAssemble") == true) {
				this.mkdir('resources/templates');
				this.copy('resources/templates/data/config.json');
				this.directory('resources/templates/ajax', 'resources/templates/ajax');
				this.directory('resources/templates/helpers', 'resources/templates/helpers');
				this.copy('resources/templates/layouts/tpl-default.hbs');
				this.copy('resources/templates/pages/index.hbs');

				// Add global partials
				this.mkdir('resources/templates/partials');
				this.directory('resources/templates/partials/_global', 'resources/templates/partials/_global');

				// Add Gruntfile-helper file
				this.copy('helpers/_grunt/_assemble.js.ejs', 'helpers/_grunt/assemble.js');
			}
		},

		grunt: function () {
			// var done = this.async();
			// Grunt modules are splitted up in separate files and modules
			if (this.modules && this.modules.length) {
				if (this.modules.indexOf('grunt-accessibility') != -1) {
					this.copy('helpers/_grunt/accessibility.js', 'helpers/_grunt/accessibility.js');
				}
				if (this.modules.indexOf('grunt-autoprefixer') != -1) {
					this.copy('helpers/_grunt/autoprefixer.js', 'helpers/_grunt/autoprefixer.js');
				}
				if (this.modules.indexOf('grunt-bless') != -1) {
					this.copy('helpers/_grunt/bless.js', 'helpers/_grunt/bless.js');
				}
				if (this.modules.indexOf('grunt-browser-sync') != -1) {
					this.template('helpers/_grunt/_browserSync.js.ejs', 'helpers/_grunt/browserSync.js');
				}
				if (this.modules.indexOf('grunt-postcss-separator') != -1) {
					this.copy('helpers/_grunt/_postcssSeparator.js.ejs', 'helpers/_grunt/postcssSeparator.js');
				}
				if (this.modules.indexOf('grunt-csscomb') != -1) {
					this.copy('helpers/_grunt/csscomb.js', 'helpers/_grunt/csscomb.js');
					this.copy('helpers/configs/csscomb.json', 'helpers/configs/csscomb.json');
				}
				if (this.modules.indexOf('grunt-contrib-htmlmin') != -1) {
					this.copy('helpers/_grunt/htmlmin.js', 'helpers/_grunt/htmlmin.js');
				}
				if (this.modules.indexOf('grunt-contrib-requirejs') != -1 || (this.jsLibs && this.jsLibs.length && this.jsLibs.indexOf('requirejs') != -1)) {
					this.copy('helpers/_grunt/requirejs.js', 'helpers/_grunt/requirejs.js');
				}
				if (this.modules.indexOf('grunt-contrib-uglify') != -1) {
					this.template('helpers/_grunt/uglify.js', 'helpers/_grunt/uglify.js');
				}
				if (this.modules.indexOf('grunt-combine-mq') != -1) {
					this.copy('helpers/_grunt/combine_mq.js', 'helpers/_grunt/combine_mq.js');
				}
				if (this.modules.indexOf('grunt-contrib-compass') != -1) {
					this.copy('helpers/_grunt/compass.js', 'helpers/_grunt/compass.js');
				}
				if (this.modules.indexOf('grunt-dr-svg-sprites') != -1) {
					this.mkdir('resources/scss/icons');
					this.template('helpers/_grunt/_dr-svg-sprites.js.ejs', 'helpers/_grunt/dr-svg-sprites.js');
					this.copy('helpers/templates/svg-sprites/stylesheet.hbs');
				}
				if (this.modules.indexOf('grunt-grunticon') != -1) {
					this.directory('resources/scss/icons', 'resources/scss/icons');
					this.directory('helpers/templates/grunticon-template', 'helpers/templates/grunticon-template');
					this.template('helpers/_grunt/_grunticon.js.ejs', 'helpers/_grunt/grunticon.js');
				}
				if (this.modules.indexOf('grunt-image-size-export') != -1) {
					this.copy('helpers/_grunt/imageSizeExport.js', 'helpers/_grunt/imageSizeExport.js');
				}
				if (this.modules.indexOf('grunt-jsdoc') != -1 || (this.features && this.features.length && this.features.indexOf('installDocs') != -1)) {
					this.copy('helpers/_grunt/jsdoc.js');
					this.copy('helpers/configs/jsdoc.conf.json');
					this.copy('resources/js/README.md');
				}
				if (this.modules.indexOf('grunt-modernizr') != -1) {
					this.copy('helpers/_grunt/modernizr.js', 'helpers/_grunt/modernizr.js');
				}
				if (this.modules.indexOf('grunt-packager') != -1) {
					this.copy('resources/js/project.jspackcfg');
					this.copy('helpers/_grunt/packager.js', 'helpers/_grunt/packager.js');
				}
				if (this.modules.indexOf('grunt-phantomas') != -1) {
					this.copy('helpers/_grunt/phantomas.js', 'helpers/_grunt/phantomas.js');
				}
				if (this.modules.indexOf('grunt-photobox') != -1) {
					this.template('helpers/_grunt/photobox.js', 'helpers/_grunt/photobox.js');
				}
				if (this.modules.indexOf('grunt-responsive-images') != -1) {
					this.copy('helpers/_grunt/responsive_images.js', 'helpers/_grunt/responsive_images.js');
				}
				if (this.modules.indexOf('grunt-svgmin') != -1) {
					this.copy('helpers/_grunt/svgmin.js', 'helpers/_grunt/svgmin.js');
				}
				if (this.modules.indexOf('grunt-version') != -1) {
					this.copy('helpers/_grunt/version.js', 'helpers/_grunt/version.js');
					this.copy('resources/templates/partials/blocks/b-version.hbs', 'resources/templates/partials/blocks/b-version.hbs');
				}

				if (this.features && this.features.length && this.features.indexOf('sassInsteadOfCompass') != -1 || this.modules.indexOf('grunt-responsive-images') != -1) {
					this.template('helpers/_grunt/_fileindex.js.ejs', 'helpers/_grunt/fileindex.js');
				}

				if (this.modules.indexOf('grunt-grunticon') != -1 || this.modules.indexOf('grunt-dr-svg-sprites') != -1) {
					this.template('helpers/_grunt/_replace.js.ejs', 'helpers/_grunt/replace.js');
				}

				if (this.modules.indexOf('grunt-grunticon') != -1 && this.modules.indexOf('grunt-postcss-separator') != -1) {
					this.copy('resources/js/vendor/loadCSS.js', 'resources/js/vendor/loadCSS.js');
				}
			}
			if (this.features && this.features.length) {

				// Add Libsass
				if (this.features.indexOf('sassInsteadOfCompass') != -1) {
					this.template('helpers/_grunt/_sass.js.ejs', 'helpers/_grunt/sass.js');
				} else {
					this.copy('helpers/_grunt/bgShell.js', 'helpers/_grunt/bgShell.js');
					this.copy('config.rb', 'config.rb');
				}

				// Add copy task
				if (this.features.indexOf('createDevFolder') != -1 || this.features.indexOf('installDocs') != -1) {
					this.copy('helpers/_grunt/_copy.js.ejs', 'helpers/_grunt/copy.js');
				}

			} else {
				this.copy('helpers/_grunt/bgShell.js', 'helpers/_grunt/bgShell.js');
				this.copy('config.rb', 'config.rb');
			}
		},

		features: function () {
			if (this.features && this.features.length) {
				if (this.features.indexOf('installDocs') != -1) {
					this.directory('resources/scss/docs', 'resources/scss/docs');
					this.copy('resources/scss/docs.scss', 'resources/scss/docs.scss');

					if (this.config.get("installAssemble") == true) {
						this.directory('resources/templates/docs', 'resources/templates/docs');
					}
				}
				// Add Dev Folder
				if (this.features.indexOf('createDevFolder') != -1) {
					this.mkdir('_dist');
				}
			}
			if (this.features.indexOf('installDocs') == -1) delete this.bowerFile['dependencies']['highlightjs'];
		},

		cssLibs: function () {
			// Delete CSS packages
			if (this.cssLibs.indexOf('foundation') == -1) delete this.bowerFile['dependencies']['foundation'];
			if (this.cssLibs.indexOf('sass-bootstrap') == -1) delete this.bowerFile['dependencies']['sass-bootstrap'];
			if (this.cssLibs.indexOf('neat') == -1) {
				delete this.bowerFile['dependencies']['bourbon'];
				delete this.bowerFile['dependencies']['neat'];
			}
		},

		jsLibs: function () {
			// Add JS files for libraries
			if (this.jsLibs.indexOf('requirejs') != -1) {
				this.template('resources/js/_main.js.ejs', 'resources/js/main.js');
				this.template('resources/js/_config.js.ejs', 'resources/js/config.js');
				this.copy('resources/js/app.js', 'resources/js/app.js');
			} else {
				delete this.bowerFile['dependencies']['almond'];
				delete this.bowerFile['dependencies']['requirejs'];
				delete this.bowerFile['dependencies']['requirejs-text'];
			}

			if (this.jsLibs.indexOf('backbone') == -1) delete this.bowerFile['dependencies']['backbone'];
			if (this.jsLibs.indexOf('jquery') == -1) delete this.bowerFile['dependencies']['jquery'];
		},

		pg: function () {
			// Add PG methodology
			if (this.pgPackages && this.pgPackages.length) {
				if (this.pgPackages.indexOf('pgMethodology') != -1) {

					// Data
					this.mkdir('resources/data/blocks');
					this.mkdir('resources/data/pages');
					this.mkdir('resources/data/_global');

					// Layouts
					this.copy('resources/templates/layouts/README.md');

					// Panels/Factories
					this.copy('resources/templates/partials/panels/README.md');

					// Blocks
					this.copy('resources/templates/partials/blocks/README.md');

					// Components
					this.directory('resources/templates/partials/components/_base', 'resources/templates/partials/components');

					// Modules
					this.directory('resources/templates/partials/modules', 'resources/templates/partials/modules');

					// SCSS
					this.mkdir('resources/scss/blocks');
					this.mkdir('resources/scss/components');
					this.mkdir('resources/scss/modules');
					this.mkdir('resources/scss/regions');
				}
			}
			if (this.pgPackages.indexOf('pgSCSS') == -1) delete this.bowerFile['dependencies']['pg-scss'];
			if (this.pgPackages.indexOf('pgJS') == -1) delete this.bowerFile['dependencies']['pg-js'];
			if (this.pgPackages.indexOf('pgComponents') == -1) delete this.bowerFile['dependencies']['pg-components'];
		},

		bower: function () {
			this.dest.write('bower.json', JSON.stringify(this.bowerFile, null, 4));
		}
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install'] || this.options['s'],
			skipMessage: this.options['skip-welcome-message'] || this.options['w']
		});
	}
});