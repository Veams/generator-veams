'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var pgHelpers = require('../../lib/pg-helpers');


module.exports = yeoman.generators.Base.extend({

	// Initialize general settings and store some files
	initializing: function () {
		this.pkg = require('../../package.json');
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
			projectName: '',
			projectAuthor: '',
			taskRunner: [
				'grunt'
			],
			templateEngine: '',
			installExtendedLayout: false,
			installPlugin: false,
			gulpModules: [],
			gruntModules: [
				'grunt-combine-mq',
				'grunt-dr-svg-sprites'
			],
			features: [
				'sassInsteadOfCompass'
			],
			jsLibs: [],
			cssLibs: [],
			pgPackages: [],
			installProxy: false,
			proxyHost: '0.0.0.0 ',
			proxyPort: 80,
			author: {
				name: '',
				login: '',
				email: ''
			}
		});
	},

	selectRoutine: function () {
		var cb = this.async();
		var force = false;
		var prompts = [];

		// welcome message
		var welcome = pgHelpers.welcome;

		if (!this.options['skip-welcome-message']) {
			console.log(welcome);
		}

		if (!this.config.existed) {
			force = true;
		}

		(!this.config.get('defaultInstall') || force) && prompts.push({
			name: 'defaultInstall',
			type: 'list',
			message: 'Choose your installation routine:',
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
			default: this.config.get('defaultInstall')
		});

		this.prompt(prompts, function (answers) {

			this.defaultInstall = answers.defaultInstall || this.config.get('defaultInstall');

			//save config to .yo-rc.json
			if (this.defaultInstall === 'stdInstall') {
				console.log(
					('\n') + chalk.bgCyan('Standard installation routine selected.') + ('\n')
				);
				this.projectName = this.config.get('projectName');
				this.authorLogin = this.config.get('projectAuthor');
				this.taskRunner = this.config.get('taskRunner');
				this.templateEngine = this.config.set('templateEngine', 'assemble');
				this.installExtendedLayout = this.config.set('installExtendedLayout', true);
				this.plugin = this.config.get('plugin');
				this.gulpModules = this.config.get('gulpModules');
				this.gruntModules = this.config.get('gruntModules');
				this.features = this.config.get('features');
				this.jsLibs = this.config.get('jsLibs');
				this.cssLibs = this.config.get('cssLibs');
				this.pgPackages = this.config.get('pgPackages');
				this.authorName = this.config.get('author').name;
				this.authorEmail = this.config.get('author').email;
				this.proxyHost = this.config.get('proxyHost');
				this.proxyPort = this.config.get('proxyPort');

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

	_prompting: function () {
		var cb = this.async();
		this.force = false;
		this.questions = [];

		if (!this.config.existed) {
			this.force = true;
		}

		this._generalPrompts();
		this._featurePrompts();
		this._gulpPrompts();
		this._gruntPrompts();
		this._templatePrompts();

		this.prompt(this.questions, function (answers) {
			this.authorName = this.config.get('author').name;
			this.authorEmail = this.config.get('author').email;
			this.projectName = answers.projectName || this.config.get('projectName');
			this.authorLogin = answers.projectAuthor || this.config.get('projectAuthor');
			this.taskRunner = answers.taskRunner;
			this.gulpModules = answers.gulpModules || this.config.get('gulpModules');
			this.gruntModules = answers.gruntModules || this.config.get('gruntModules');
			this.templateEngine = answers.templateEngine || this.config.get('templateEngine');
			this.installExtendedLayout = answers.installExtendedLayout || this.config.get('installExtendedLayout');
			this.plugin = answers.plugin;
			this.features = answers.features;
			this.jsLibs = answers.jsLibs;
			this.cssLibs = answers.cssLibs;
			this.pgPackages = answers.pgPackages;
			this.proxyHost = this.config.get('proxyHost');
			this.proxyPort = this.config.get('proxyPort');

			//save config to .yo-rc.json
			this.config.set(answers);
			cb();

		}.bind(this));
	},

	_generalPrompts: function () {
		(!this.config.get('projectName') || this.force) && this.questions.push({
			type: 'input',
			name: 'projectName',
			message: 'Your project name',
			default: this.appname
		});

		(!this.config.get('projectAuthor') || this.force) && this.questions.push({
			type: 'input',
			name: 'projectAuthor',
			message: 'Would you mind telling me your name?',
			default: this.config.get('projectAuthor')
		});

		(!this.config.get('taskRunner') || this.force) && this.questions.push({
			type: 'checkbox',
			name: 'taskRunner',
			message: 'Which task runner do you want to use?',
			choices: [
				{name: 'Grunt', value: 'grunt'},
				{name: 'Gulp', value: 'gulp'}
			],
			validate: function (answer) {
				if (answer.length === 0) {
					return false;
				} else {
					return true;
				}
			},
			default: this.config.get('taskRunner')
		});
	},

	_featurePrompts: function () {

		(!this.config.get('features') || this.force) && this.questions.push({
			name: 'features',
			type: 'checkbox',
			message: 'Do you need anything special?',
			choices: [
				{
					name: 'Node-Sass instead of Ruby Sass',
					value: 'sassInsteadOfCompass',
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
					checked: false
				}
			],
			default: this.config.get('features')
		});

		(!this.config.get('jsLibs') || this.force) && this.questions.push({
			name: 'jsLibs',
			type: 'checkbox',
			message: 'Do you want to use any JS Libraries?',
			choices: [
				{
					name: 'jQuery (latest Version)',
					value: 'jquery',
					checked: true
				},
				{
					name: 'BackboneJS',
					value: 'backbone',
					checked: false
				},
				{
					name: 'Exoskeleton',
					value: 'exoskeleton',
					checked: true
				},
				{
					name: 'Ampersand (can only be used with CommonJS)',
					value: 'ampersand',
					checked: false
				}
			],
			default: this.config.get('jsLibs')
		});

		(!this.config.get('cssLibs') || this.force) && this.questions.push({
			name: 'cssLibs',
			type: 'checkbox',
			message: 'Do you want to use any CSS Frameworks?',
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
			default: this.config.get('cssLibs')
		});

		(!this.config.get('pgPackages') || this.force) && this.questions.push({
			name: 'pgPackages',
			type: 'checkbox',
			message: 'Do you want to use PG Packages (Bower Component)?',
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
			default: this.config.get('pgPackages')
		});
	},

	// Custom grunt prompts routine
	_gruntPrompts: function () {
		(!this.config.get('gruntModules') || this.force) && this.questions.push({
			when: function (answers) {
				return answers.taskRunner
					&& answers.taskRunner.length > 0
					&& answers.taskRunner.indexOf('grunt') !== -1;
			},
			name: 'gruntModules',
			type: 'checkbox',
			message: 'Which grunt modules do you want to use?',
			choices: [
				{name: 'grunt-accessibility'},
				{name: 'grunt-autoprefixer', checked: true},
				{name: 'grunt-bless'},
				{name: 'grunt-browser-sync', checked: true},
				{name: 'grunt-browserify', checked: true},
				{name: 'grunt-combine-mq', checked: true},
				{name: 'grunt-connect-proxy (CORS, Basic Auth and http methods)', value: 'grunt-connect-proxy'},
				{name: 'grunt-contrib-htmlmin'},
				{name: 'grunt-contrib-requirejs'},
				{name: 'grunt-contrib-uglify'},
				{name: 'grunt-csscomb'},
				{name: 'grunt-dr-svg-sprites', checked: true},
				{name: 'grunt-grunticon'},
				{name: 'grunt-image-size-export'},
				{name: 'grunt-jsdoc'},
				{name: 'grunt-modernizr'},
				{name: 'grunt-packager'},
				{name: 'grunt-phantomas'},
				{name: 'grunt-photobox'},
				{name: 'grunt-postcss-separator'},
				{name: 'grunt-responsive-images'},
				{name: 'grunt-svgmin'},
				{name: 'grunt-ts'},
				{name: 'grunt-version', checked: true}
			],
			default: this.config.get('gruntModules')
		});

		this.questions.push({
			when: function (answers) {
				return answers.gruntModules
					&& answers.gruntModules.length > 0
					&& answers.gruntModules.indexOf('grunt-connect-proxy') !== -1;
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
			default: this.config.get('proxyHost')
		});

		this.questions.push({
			when: function (answers) {
				return answers.gruntModules
					&& answers.gruntModules.length > 0
					&& answers.gruntModules.indexOf('grunt-connect-proxy') !== -1
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
			default: this.config.get('proxyPort')
		});
	},

	// Custom grunt prompts routine
	_gulpPrompts: function () {
		(!this.config.get('gulpModules') || this.force) && this.questions.push({
			when: function (answers) {
				return answers.taskRunner
					&& answers.taskRunner.length
					&& answers.taskRunner.indexOf('gulp') !== -1;
			},
			name: 'gulpModules',
			type: 'checkbox',
			message: 'Which gulp modules do you want to use?',
			choices: [
				// {name: 'gulp-arialinter'},
				{name: 'browserify'},
				{name: 'gulp-autoprefixer', checked: true},
				{name: 'gulp-bless'},
				{name: 'gulp-combine-mq', checked: true},
				{name: 'gulp-htmlmin'},
				{name: 'gulp-htmlhint'},
				// {name: 'gulp-iconify'},
				// {name: 'gulp-jsdoc'},
				{name: 'gulp-jshint'},
				// {name: 'gulp-modulizr'},
				{name: 'gulp-requirejs-optimize'},
				// {name: 'gulp-responsive'},
				// {name: 'gulp-svg-sprite', checked: true},
				{name: 'gulp-uglify'}
			],
			default: this.config.get('gulpModules')
		});
	},

	_templatePrompts: function () {

		(!this.config.get('templateEngine') || this.force) && this.questions.push({
			type: 'list',
			name: 'templateEngine',
			message: 'Which template engine do you want to install?',
			choices: [
				{name: 'Assemble', value: 'assemble'},
				{name: 'none', value: ''}
				// {name: 'veams'}
			],
			default: 'assemble'
		});

		this.questions.push({
			when: function (answers) {
				return answers.templateEngine.indexOf('assemble') !== -1;
			},
			type: 'confirm',
			message: 'Extended Layout for Assemble?',
			name: 'installExtendedLayout',
			default: true
		});

		this.questions.push({
			when: function (answers) {
				return answers.templateEngine.indexOf('assemble') !== -1;
			},
			type: 'confirm',
			name: 'installPlugin',
			message: 'Do you want to install assemble plugins?',
			default: this.config.get('installPlugin')
		});
		this.questions.push({
			when: function (answers) {
				return answers.installPlugin;
			},
			name: 'plugin',
			type: 'checkbox',
			message: 'Which assemble plugin do you want to use?',
			choices: [
				{name: 'assemble-contrib-permalinks'},
				{name: 'assemble-contrib-sitemap'},
				{name: 'assemble-related-pages'}
			]
		});
	},

	writing: {
		setup: function () {
			this.copy('gitignore', '.gitignore');
			this.copy('bowerrc', '.bowerrc');
			this.template('_package.json.ejs', 'package.json');
			this.template('helpers/config.js.ejs', 'helpers/config.js');
			this.template('README.md.ejs', 'README.md');

			this.bowerFile['name'] = this.config.get('projectName');
		},

		defaults: function () {
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

		workflow: function () {
			if (this.taskRunner.indexOf('gulp') != -1) this._scaffoldGulp();
			if (this.taskRunner.indexOf('grunt') != -1) this._scaffoldGrunt();
		},

		templateSystem: function () {
			// add global assemble files
			if (this.templateEngine !== '') {
				this.mkdir('resources/templating');
				this.copy('resources/templating/data/config.json');
				this.directory('resources/templating/ajax', 'resources/templating/ajax');
				this.directory('resources/templating/helpers', 'resources/templating/helpers');
				this.template('resources/templating/layouts/lyt-default.hbs.ejs', 'resources/templating/layouts/lyt-default.hbs');
				this.template('resources/templating/pages/index.hbs.ejs', 'resources/templating/pages/index.hbs');

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

				if (this.templateEngine.indexOf('veams') !== -1) {
					// Add Gruntfile-helper file
					// this.copy('helpers/_grunt/_veams.js.ejs', 'helpers/_grunt/veams.js');
				}
			}
		},

		features: function () {
			if (this.features.indexOf('installDocs') != -1 || this.gruntModules.indexOf('grunt-jsdoc') || this.gulpModules.indexOf('gulp-jsdoc')) {
				this.copy('helpers/task-configs/jsdoc.conf.json');
				this.copy('resources/js/README.md');
			}
			if (this.features.indexOf('installDocs') != -1) {
				this.directory('resources/scss/docs', 'resources/scss/docs');
				this.copy('resources/scss/docs.scss', 'resources/scss/docs.scss');
				if (this.templateEngine !== '') {
					this.template('resources/templating/docs/index.hbs.ejs', 'resources/templating/docs/index.hbs');
				}
			}
			// Add Dev Folder
			if (this.features.indexOf('createDevFolder') != -1) {
				this.mkdir('_dist');
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
			if (this.gruntModules.indexOf('grunt-browserify') !== -1 || this.gulpModules.indexOf('browserify') !== -1) {
				this.template('resources/js/_main.browserify.js.ejs', 'resources/js/main.js');
				this.template('resources/js/_app.browserify.js.ejs', 'resources/js/app.js');

				delete this.bowerFile['dependencies']['almond'];
				delete this.bowerFile['dependencies']['requirejs'];
				delete this.bowerFile['dependencies']['requirejs-text'];
			}

			// Add JS files for libraries
			if (this.gruntModules.indexOf('grunt-contrib-requirejs') != -1 || this.gulpModules.indexOf('gulp-requirejs-optimize') != -1) {
				this.template('resources/js/_main.require.js.ejs', 'resources/js/main.js');
				this.template('resources/js/_app.require.js.ejs', 'resources/js/app.js');
			}

			if (this.jsLibs.indexOf('backbone') == -1 &&
				this.gruntModules.indexOf('grunt-contrib-requirejs') != -1) delete this.bowerFile['dependencies']['backbone'];
			if (this.jsLibs.indexOf('jquery') == -1 &&
				this.gruntModules.indexOf('grunt-contrib-requirejs') != -1) delete this.bowerFile['dependencies']['jquery'];
		},

		pg: function () {
			// Add PG methodology
			if (this.pgPackages && this.pgPackages.length) {
				if (this.pgPackages.indexOf('pgMethodology') != -1) {

					if (this.templateEngine !== '') {
						// Data
						this.mkdir('resources/templating/data/blocks');
						this.mkdir('resources/templating/data/pages');
						this.mkdir('resources/templating/data/_global');

						// Layouts
						this.copy('resources/templating/layouts/README.md');

						// Panels/Factories
						this.copy('resources/templating/partials/panels/README.md');

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
			}
			if (this.pgPackages.indexOf('pgSCSS') == -1) delete this.bowerFile['dependencies']['pg-scss'];
			if (this.pgPackages.indexOf('pgJS') == -1) delete this.bowerFile['dependencies']['pg-js'];
			if (this.pgPackages.indexOf('pgComponents') == -1) delete this.bowerFile['dependencies']['pg-components'];
		},

		bower: function () {
			this.dest.write('bower.json', JSON.stringify(this.bowerFile, null, 4));
		}
	},

	_scaffoldGrunt: function () {
		// Copy standard files
		this.template('Gruntfile.js.ejs', 'Gruntfile.js');
		this.mkdir('helpers/_grunt');

		if (this.taskRunner.indexOf('grunt') != -1 && this.taskRunner.indexOf('gulp') == -1) {
			this.template('helpers/_grunt/_clean.js.ejs', 'helpers/_grunt/clean.js');
			this.template('helpers/_grunt/_concurrent.js.ejs', 'helpers/_grunt/concurrent.js');
			this.template('helpers/_grunt/connect.js', 'helpers/_grunt/connect.js');
			this.copy('helpers/_grunt/cssmin.js', 'helpers/_grunt/cssmin.js');
			this.copy('helpers/_grunt/htmlhint.js', 'helpers/_grunt/htmlhint.js');
			this.copy('helpers/_grunt/jshint.js', 'helpers/_grunt/jshint.js');
			this.copy('helpers/_grunt/jsbeautifier.js', 'helpers/_grunt/jsbeautifier.js');
			this.copy('helpers/task-configs/.jsbeautifierrc', 'helpers/task-configs/.jsbeautifierrc');
			this.template('helpers/_grunt/_sync.js.ejs', 'helpers/_grunt/sync.js');
			this.template('helpers/_grunt/_watch.js.ejs', 'helpers/_grunt/watch.js');
		}

		// Grunt modules are splitted up in separate files and modules
		if (this.gruntModules && this.gruntModules.length) {
			if (this.gruntModules.indexOf('grunt-accessibility') != -1) {
				this.copy('helpers/_grunt/accessibility.js', 'helpers/_grunt/accessibility.js');
			}
			if (this.gruntModules.indexOf('grunt-autoprefixer') != -1) {
				this.copy('helpers/_grunt/autoprefixer.js', 'helpers/_grunt/autoprefixer.js');
			}
			if (this.gruntModules.indexOf('grunt-bless') != -1) {
				this.copy('helpers/_grunt/bless.js', 'helpers/_grunt/bless.js');
			}
			if (this.gruntModules.indexOf('grunt-browser-sync') != -1) {
				this.template('helpers/_grunt/_browserSync.js.ejs', 'helpers/_grunt/browserSync.js');
			}
			if (this.gruntModules.indexOf('grunt-browserify') != -1) {
				this.template('helpers/_grunt/_browserify.js.ejs', 'helpers/_grunt/browserify.js');
			}
			if (this.gruntModules.indexOf('grunt-postcss-separator') != -1) {
				this.copy('helpers/_grunt/_postcssSeparator.js.ejs', 'helpers/_grunt/postcssSeparator.js');
			}
			if (this.gruntModules.indexOf('grunt-csscomb') != -1) {
				this.copy('helpers/_grunt/csscomb.js', 'helpers/_grunt/csscomb.js');
				this.copy('helpers/task-configs/csscomb.json', 'helpers/task-configs/csscomb.json');
			}
			if (this.gruntModules.indexOf('grunt-contrib-htmlmin') != -1) {
				this.copy('helpers/_grunt/htmlmin.js', 'helpers/_grunt/htmlmin.js');
			}
			if (this.gruntModules.indexOf('grunt-contrib-requirejs') != -1) {
				this.copy('helpers/_grunt/requirejs.js', 'helpers/_grunt/requirejs.js');
			}
			if (this.gruntModules.indexOf('grunt-contrib-uglify') != -1) {
				this.template('helpers/_grunt/_uglify.js.ejs', 'helpers/_grunt/uglify.js');
			}
			if (this.gruntModules.indexOf('grunt-combine-mq') != -1) {
				this.copy('helpers/_grunt/combine_mq.js', 'helpers/_grunt/combine_mq.js');
			}
			if (this.gruntModules.indexOf('grunt-dr-svg-sprites') != -1) {
				this.mkdir('resources/scss/icons');
				this.template('helpers/_grunt/_dr-svg-sprites.js.ejs', 'helpers/_grunt/dr-svg-sprites.js');
				this.copy('helpers/templates/svg-sprites/stylesheet.hbs');
			}
			if (this.gruntModules.indexOf('grunt-grunticon') != -1) {
				this.directory('resources/scss/icons', 'resources/scss/icons');
				this.directory('helpers/templates/grunticon', 'helpers/templates/grunticon');
				this.template('helpers/_grunt/_grunticon.js.ejs', 'helpers/_grunt/grunticon.js');
			}
			if (this.gruntModules.indexOf('grunt-image-size-export') != -1) {
				this.copy('helpers/_grunt/imageSizeExport.js', 'helpers/_grunt/imageSizeExport.js');
			}
			if (this.gruntModules.indexOf('grunt-jsdoc') != -1 || (this.features.indexOf('installDocs') != -1)) {
				this.copy('helpers/_grunt/jsdoc.js');
			}
			if (this.gruntModules.indexOf('grunt-modernizr') != -1) {
				this.copy('helpers/_grunt/modernizr.js', 'helpers/_grunt/modernizr.js');
			}
			if (this.gruntModules.indexOf('grunt-packager') != -1) {
				this.copy('resources/js/project.jspackcfg');
				this.copy('helpers/_grunt/packager.js', 'helpers/_grunt/packager.js');
			}
			if (this.gruntModules.indexOf('grunt-phantomas') != -1) {
				this.copy('helpers/_grunt/phantomas.js', 'helpers/_grunt/phantomas.js');
			}
			if (this.gruntModules.indexOf('grunt-photobox') != -1) {
				this.template('helpers/_grunt/photobox.js', 'helpers/_grunt/photobox.js');
			}
			if (this.gruntModules.indexOf('grunt-responsive-images') != -1) {
				this.copy('helpers/_grunt/responsive_images.js', 'helpers/_grunt/responsive_images.js');
			}
			if (this.gruntModules.indexOf('grunt-svgmin') != -1) {
				this.copy('helpers/_grunt/svgmin.js', 'helpers/_grunt/svgmin.js');
			}
			if (this.gruntModules.indexOf('grunt-version') != -1) {
				this.copy('helpers/_grunt/version.js', 'helpers/_grunt/version.js');
				this.copy('resources/templating/partials/blocks/b-version.hbs', 'resources/templating/partials/blocks/b-version.hbs');
			}

			if (this.gruntModules.indexOf('grunt-grunticon') != -1 || this.gruntModules.indexOf('grunt-dr-svg-sprites') != -1) {
				this.template('helpers/_grunt/_replace.js.ejs', 'helpers/_grunt/replace.js');
			}

			if (this.gruntModules.indexOf('grunt-grunticon') != -1 && this.gruntModules.indexOf('grunt-postcss-separator') != -1) {
				this.copy('resources/js/vendor/loadCSS.js', 'resources/js/vendor/loadCSS.js');
			}
		}
		if (this.features && this.features.length) {

			// Add Libsass
			if (this.features.indexOf('sassInsteadOfCompass') != -1) {
				if (this.taskRunner.indexOf('gulp') == -1) {
					this.template('helpers/_grunt/_sass.js.ejs', 'helpers/_grunt/sass.js');
					this.template('helpers/_grunt/_sassGlobber.js.ejs', 'helpers/_grunt/sassGlobber.js');
				}
			} else {
				if (this.taskRunner.indexOf('gulp') == -1) {
					this.copy('helpers/_grunt/bgShell.js', 'helpers/_grunt/bgShell.js');
				}
				this.copy('config.rb', 'config.rb');
			}

			// Add copy task
			if (this.taskRunner.indexOf('grunt') != -1 && (this.features.indexOf('createDevFolder') != -1 || this.features.indexOf('installDocs') != -1)) {
				this.copy('helpers/_grunt/_copy.js.ejs', 'helpers/_grunt/copy.js');
			}

		} else {
			if (this.taskRunner.indexOf('gulp') == -1) {
				this.copy('helpers/_grunt/bgShell.js', 'helpers/_grunt/bgShell.js');
			}
			this.copy('config.rb', 'config.rb');
		}
	},

	_scaffoldGulp: function () {
		// Copy standard files
		this.template('Gulpfile.js.ejs', 'Gulpfile.js');
		this.mkdir('helpers/_gulp');
		this.template('helpers/_gulp/_clean.js.ejs', 'helpers/_gulp/clean.js');
		this.template('helpers/_gulp/_styles.js.ejs', 'helpers/_gulp/styles.js');
		// if .gulpModules.indexOf('gulp-htmlhint') !== -1 || this.gulpModules.indexOf()
		this.template('helpers/_gulp/_hinting.js.ejs', 'helpers/_gulp/hinting.js');
		this.template('helpers/_gulp/_html.js.ejs', 'helpers/_gulp/html.js');
		this.template('helpers/_gulp/_copy.js.ejs', 'helpers/_gulp/copy.js');

		// Add scripts task
		if (this.gulpModules.indexOf('gulp-requirejs-optimize') !== -1 ||
			this.gulpModules.indexOf('browserify') !== -1 ||
			this.gulpModules.indexOf('gulp-uglify') !== -1) {
			this.template('helpers/_gulp/_scripts.js.ejs', 'helpers/_gulp/scripts.js');
		}
		// this.copy('helpers/_gulp/beautify.js', 'helpers/_grunt/beautify.js');
		this.copy('helpers/task-configs/.jsbeautifierrc', 'helpers/task-configs/.jsbeautifierrc');

		// Gulp modules are splitted up in separate files and modules
		if (this.gulpModules && this.gulpModules.length) {
			if (this.gulpModules.indexOf('gulp-iconify') != -1 || this.gulpModules.indexOf('gulp-svg-sprite') != -1) {
				this.template('helpers/_gulp/_icons.js.ejs', 'helpers/_gulp/icons.js');
			}
		}
		if (this.features.indexOf('sassInsteadOfCompass') == -1) {
			this.copy('config.rb', 'config.rb');
		}
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install'] || this.options['s'],
			skipMessage: this.options['skip-welcome-message'] || this.options['w'],
			standardInstall: this.options['standard'] || this.options['std']
		});
	}
});