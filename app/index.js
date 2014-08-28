'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

/**
 * Module exports Prototype Generator constructor
 * Extend Yeoman base generator
 */

var PrototypeGenerator = module.exports = function PrototypeGenerator(args, options, config) {

	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.installDependencies({
			skipInstall: options['skip-install'] || options['s'],
			skipMessage: options['skip-welcome-message'] || options['w']
		});
	});

	this.files = this.expandFiles('**/*', { cwd: this.sourceRoot(), dot: true });

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

	this.dotFiles = [
		'gitignore',
		'gitattributes',
		'editorconfig',
		'bowerrc',
		'jshintrc'
	];

	this.pkgFiles = ['_package.json'];

	this.config.defaults({
		projectName: "",
		projectAuthor: "",
		batchFiles: false,
		installAssemble: "",
		installPlugin: false,
		installCMS: false,
		modules: [
			"grunt-grunticon",
			"grunt-data-separator",
			"grunt-csscomb",
			"grunt-combine-media-queries",
			"grunt-autoprefixer",
			"grunt-browser-sync"
		],
		features: [
			"installDocs",
			"installDemoContent",
			"sassInsteadOfCompass"
		],
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

util.inherits(PrototypeGenerator, yeoman.generators.Base);

/**
 * Command prompt questions
 * Extend defaults and options based on user answers
 */


PrototypeGenerator.prototype.askDefault = function askDefault() {
	var cb = this.async();

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

	var force = false;
	if (!this.config.existed) {
		force = true;
	}

	var prompts = [];


	(!this.config.get("defaultInstall") || force) && prompts.push({
		name: "defaultInstall",
		type: "list",
		message: "Choose your installation routine:",
		choices: [
			{
				name: 'Standard Installation',
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
			this.CMS = this.config.get("CMS");
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
			this._askFor();
		}
	}.bind(this));
}

PrototypeGenerator.prototype._askFor = function _askFor() {
	var done = this.async();

	var force = false;
	if (!this.config.existed) {
		force = true;
	}

	var questions = [];

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
			{ name: "assemble-contrib-permalinks"},
			{ name: "assemble-contrib-sitemap"},
			{ name: "assemble-related-pages"}
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
			{ name: "grunt-accessibility"},
			{ name: "grunt-autoprefixer", checked: true },
			{ name: "grunt-bless"},
			{ name: "grunt-browser-sync", checked: true },
			{ name: "grunt-combine-media-queries", checked: true },
			{ name: "grunt-connect-proxy (CORS, Basic Auth and http methods)", value: "grunt-connect-proxy"},
			{ name: "grunt-contrib-compass" },
			{ name: "grunt-contrib-htmlmin"},
			// { name: "grunt-contrib-uglify"},
			{ name: "grunt-csscomb", checked: true },
			{ name: "grunt-data-separator", checked: true },
			{ name: "grunt-devtools"},
			{ name: "dr-grunt-svg-sprites"},
			{ name: "grunt-grunticon", checked: true },
			{ name: "grunt-modernizr"},
			{ name: "grunt-packager"},
			{ name: "grunt-photobox"}
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
				name: 'Scaffold demo content? Otherwise you get only the base components ...',
				value: 'installDemoContent',
				checked: false
			},
			{
				name: 'Create Development Folder to get two outputs (Dev-Output, Dist-Output)',
				value: 'createDevFolder',
				checked: true
			},
			{
				name: 'Create Developer Documentation',
				value: 'installDocs',
				checked: true
			},
			{
				name: 'Support IE8',
				value: 'supportIE8',
				checked: false
			},
			{
				name: 'Start developing mobile first and need to support desktop styles in IE8',
				value: 'mobileFirst',
				checked: false
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
			},
			{
				name: 'AngularJS',
				value: 'angular',
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

	/*(!this.config.get("installCMS") || force) && questions.push({
	 type: "confirm",
	 name: "installCMS",
	 message: "Would you want to install CMS snippets for your project?",
	 default: this.config.get("installCMS")
	 });
	 questions.push({
	 name: "CMS",
	 type: "list",
	 message: "Which CMS snippets do you want to use?",
	 choices: [
	 { name: "TYPO3"},
	 { name: "Drupal"},
	 { name: "Magnolia"},
	 { name: "CoreMedia"}
	 ],
	 when: function (answers) {
	 return answers.installCMS;
	 }
	 });*/

	this.prompt(questions, function (answers) {

		this.projectName = answers.projectName || this.config.get("projectName");
		this.authorLogin = answers.projectAuthor || this.config.get("projectAuthor");
		this.installAssemble = answers.installAssemble || this.config.get("installAssemble");
		this.plugin = answers.plugin;
		this.modules = answers.modules;
		this.features = answers.features;
		this.jsLibs = answers.jsLibs;
		this.cssLibs = answers.cssLibs;
		// this.CMS = answers.CMS;
		this.authorName = this.config.get("author").name;
		this.authorEmail = this.config.get("author").email;
		this.proxyHost = answers.proxyHost;
		this.proxyPort = answers.proxyPort;

		//save config to .yo-rc.json
		this.config.set(answers);

		done();
	}.bind(this));
};

/**
 * Default file generation
 *
 */
PrototypeGenerator.prototype.appDefault = function appDefault() {

	var files = this.files;

	// Copy standard files
	// this.mkdir('helpers');
	this.mkdir('helpers/_grunt');
	this.template('helpers/_grunt/clean.js', 'helpers/_grunt/clean.js');
	this.template('helpers/_grunt/concurrent.js', 'helpers/_grunt/concurrent.js');
	this.template('helpers/_grunt/connect.js', 'helpers/_grunt/connect.js');
	this.copy('helpers/_grunt/cssmin.js', 'helpers/_grunt/cssmin.js');
	this.copy('helpers/_grunt/htmlhint.js', 'helpers/_grunt/htmlhint.js');
	this.copy('helpers/_grunt/jshint.js', 'helpers/_grunt/jshint.js');
	this.copy('helpers/_grunt/jsbeautifier.js', 'helpers/_grunt/jsbeautifier.js');
	this.copy('helpers/configs/.jsbeautifierrc', 'helpers/configs/.jsbeautifierrc');
	this.copy('helpers/_grunt/prettysass.js', 'helpers/_grunt/prettysass.js');
	this.template('helpers/_grunt/_sync.js', 'helpers/_grunt/sync.js');
	this.template('helpers/_grunt/_watch.js', 'helpers/_grunt/watch.js');
	this.copy('bowerrc', '.bowerrc');
	this.copy('gitignore', '.gitignore');
	this.template('README.md', 'README.md');

	this.directory('_output', '_output');

	// add batch files
	if (this.config.get("batchFiles") == true) {
		this.directory('helpers/batch_files', 'helpers/batch_files');
	}

	// add specific resources to make it possible to split up some directories
	this.mkdir('_output/js');
	this.mkdir('resources');
	this.mkdir('resources/js');
	this.mkdir('resources/scss');
	this.mkdir('resources/assets');
	this.mkdir('resources/assets/img');
	this.mkdir('resources/assets/img/temp');
	this.mkdir('resources/assets/img/svg');
	this.mkdir('resources/assets/img/svg/icons');
	this.mkdir('resources/assets/fonts');
	this.mkdir('resources/assets/media');
	this.mkdir('resources/scss/blocks');
	this.mkdir('resources/scss/components');
	this.copy('resources/scss/global/_main.scss', 'resources/scss/global/_main.scss');
	this.copy('resources/scss/global/_vars.scss', 'resources/scss/global/_vars.scss');
	this.copy('resources/scss/global/_reset.scss', 'resources/scss/global/_reset.scss');
	this.copy('resources/scss/global/_print.scss', 'resources/scss/global/_print.scss');
	this.directory('resources/scss/modules', 'resources/scss/modules');
	this.directory('resources/scss/utils', 'resources/scss/utils');
	this.template('resources/scss/_all.scss', 'resources/scss/_all.scss');
	this.copy('resources/scss/styles.scss', 'resources/scss/styles.scss');
};


/**
 * Assemble file generation
 *
 */
PrototypeGenerator.prototype.appAssembling = function appAssembling() {    // add resources

	// add global assemble files
	if (this.config.get("installAssemble") == true) {
		this.copy('resources/data/site.json');
		this.copy('resources/data/forms/form--example.json');
		this.copy('resources/data/pages/homepage.json');
		this.copy('resources/data/pages/homepage.md');
		this.mkdir('resources/templates');
		this.directory('resources/templates/ajax', 'resources/templates/ajax');
		this.directory('resources/templates/helpers', 'resources/templates/helpers');
		this.directory('resources/templates/layouts', 'resources/templates/layouts');
		this.directory('resources/templates/pages', 'resources/templates/pages');

		// Add global partials
		this.mkdir('resources/templates/partials');
		this.mkdir('resources/templates/partials/_global');
		this.directory('resources/templates/partials/_global/head', 'resources/templates/partials/_global/head');
		this.template('resources/templates/partials/_global/_scripts.hbs', 'resources/templates/partials/_global/_scripts.hbs');

		this.copy('resources/templates/partials/blocks/_sitemap.hbs');
		this.directory('resources/templates/partials/components', 'resources/templates/partials/components');
		this.directory('resources/templates/partials/modules', 'resources/templates/partials/modules');
		this.directory('resources/templates/partials/sections', 'resources/templates/partials/sections');

		// Add Gruntfile-helper file
		this.copy('helpers/_grunt/_assemble.js', 'helpers/_grunt/assemble.js');

		// Add demo content
		if (this.features && this.features.length > 0) {
			if (this.features.indexOf('installDemoContent') != -1) {

				// Data
				this.mkdir('resources/data/blocks');
				this.directory('resources/data', 'resources/data');

				// Global content
				this.copy('resources/templates/partials/_global/_footer.hbs');
				this.copy('resources/templates/partials/_global/_logo.hbs');
				this.copy('resources/templates/partials/_global/_nav.hbs');
				this.copy('resources/templates/partials/blocks/_nav-toggler.hbs');

				// Sections

				// Blocks
				this.copy('resources/templates/partials/blocks/_sidebar-right.hbs');
			}
		}
	}
};


/**
 * Grunt modules file generation
 *
 */
PrototypeGenerator.prototype.appGruntModules = function appGruntModules() {
// Grunt modules are splitted up in separate files and modules
	if (this.modules && this.modules.length > 0) {
		if (this.modules.indexOf('grunt-grunticon') != -1) {
			this.directory('resources/scss/icons', 'resources/scss/icons');
			this.directory('helpers/templates/grunticon-template', 'helpers/templates/grunticon-template');
			this.copy('helpers/_grunt/grunticon.js', 'helpers/_grunt/grunticon.js');
			if (this.features && this.features.length > 0) {
				if (this.features.indexOf('sassInsteadOfCompass') != -1) {
					this.copy('helpers/_grunt/replaceSass.js', 'helpers/_grunt/replace.js');
				} else {
					this.copy('helpers/_grunt/replace.js', 'helpers/_grunt/replace.js');
				}
			} else {
				this.copy('helpers/_grunt/replace.js', 'helpers/_grunt/replace.js');
			}
		}
		if (this.modules.indexOf('grunt-data-separator') != -1) {
			this.copy('helpers/_grunt/dataSeparator.js', 'helpers/_grunt/dataSeparator.js');
		}
		if (this.modules.indexOf('dr-grunt-svg-sprites') != -1) {
			this.mkdir('resources/scss/icons');
			this.copy('helpers/_grunt/svg-sprites.js', 'helpers/_grunt/svg-sprites.js');
		}
		if (this.modules.indexOf('grunt-modernizr') != -1) {
			this.copy('helpers/_grunt/modernizr.js', 'helpers/_grunt/modernizr.js');
		}
		if (this.modules.indexOf('grunt-packager') != -1) {
			this.copy('resources/js/project.jspackcfg');
			this.copy('helpers/_grunt/packager.js', 'helpers/_grunt/packager.js');
		}
		if (this.modules.indexOf('grunt-csscomb') != -1) {
			this.copy('helpers/_grunt/csscomb.js', 'helpers/_grunt/csscomb.js');
			this.copy('helpers/configs/csscomb.json', 'helpers/configs/csscomb.json');
		}
		if (this.modules.indexOf('grunt-contrib-htmlmin') != -1) {
			this.copy('helpers/_grunt/htmlmin.js', 'helpers/_grunt/htmlmin.js');
		}
		if (this.modules.indexOf('grunt-combine-media-queries') != -1) {
			this.copy('helpers/_grunt/cmq.js', 'helpers/_grunt/cmq.js');
		}
		if (this.modules.indexOf('grunt-bless') != -1) {
			this.copy('helpers/_grunt/bless.js', 'helpers/_grunt/bless.js');
		}
		if (this.modules.indexOf('grunt-contrib-compass') != -1) {
			this.copy('helpers/_grunt/compass.js', 'helpers/_grunt/compass.js');
		}
		if (this.modules.indexOf('grunt-browser-sync') != -1) {
			this.template('helpers/_grunt/_browserSync.js', 'helpers/_grunt/browserSync.js');
		}
		if (this.modules.indexOf('grunt-photobox') != -1) {
			this.copy('helpers/_grunt/photobox.js', 'helpers/_grunt/photobox.js');
		}
		if (this.modules.indexOf('grunt-autoprefixer') != -1) {
			this.copy('helpers/_grunt/autoprefixer.js', 'helpers/_grunt/autoprefixer.js');
		}
		if (this.modules.indexOf('grunt-accessibility') != -1) {
			this.copy('helpers/_grunt/accessibility.js', 'helpers/_grunt/accessibility.js');
		}
	}
};

/**
 * TODO: CMS STK file generation
 *
 */
PrototypeGenerator.prototype.appCMS = function appCMS() {
// CMS snippets and SCSS files
	//Drupal
	if (this.CMS == 'Drupal') {
		this.directory('resources/scss/drupal', 'resources/scss/drupal');
		this.directory('resources/templates/partials/drupal', 'resources/templates/partials/drupal');
	}
	//TYPO3
	if (this.CMS == 'TYPO3') {
		this.directory('resources/scss/typo3', 'resources/scss/typo3');
		this.directory('resources/templates/partials/typo3', 'resources/templates/partials/typo3');
	}
	//Magnolia
	if (this.CMS == 'Magnolia') {
		this.directory('resources/scss/magnolia', 'resources/scss/magnolia');
		this.directory('resources/templates/partials/magnolia', 'resources/templates/partials/magnolia');
	}
	//CoreMedia
	if (this.CMS == 'CoreMedia') {
		this.directory('resources/scss/coremedia', 'resources/scss/coremedia');
		this.directory('resources/templates/partials/coremedia', 'resources/templates/partials/coremedia');
	}
};

/**
 * Features file generation
 *
 */
PrototypeGenerator.prototype.appFeatures = function appFeatures() {
// Feature section
	if (this.features && this.features.length > 0) {
		if (this.features.indexOf('installDocs') != -1) {
			// add styleguide files
			this.directory('helpers/templates/styleguide-template', 'helpers/templates/styleguide-template');

			if (this.config.get("installAssemble") == true) {
				this.directory('resources/templates/docs', 'resources/templates/docs');
			}

			this.directory('resources/scss/docs', 'resources/scss/docs');
			this.copy('resources/scss/docs.scss', 'resources/scss/docs.scss');
			this.copy('resources/scss/styleguide.md', 'resources/scss/styleguide.md');
			this.copy('helpers/_grunt/styleguide.js', 'helpers/_grunt/styleguide.js');
		}

		// add mobile first grunt task
		if (this.features.indexOf('mobileFirst') != -1) {
			this.copy('helpers/_grunt/comment-media-queries.js', 'helpers/_grunt/comment-media-queries.js');
		}

		// Add Libsass
		if (this.features.indexOf('sassInsteadOfCompass') != -1) {
			this.template('helpers/_grunt/_sass.js', 'helpers/_grunt/sass.js');
			this.template('helpers/_grunt/fileindex.js', 'helpers/_grunt/fileindex.js');
		} else {
			this.copy('helpers/_grunt/bgShell.js', 'helpers/_grunt/bgShell.js');
			this.copy('config.rb', 'config.rb');
		}

		// Add Dev Folder
		if (this.features.indexOf('createDevFolder') != -1) {
			this.mkdir('_dist');
		}

		// Add Demo Content
		if (this.features.indexOf('installDemoContent') != -1) {

			this.directory('resources/scss/components');
			this.directory('resources/scss/blocks');

			this.copy('resources/scss/global/_nav--DEMO.scss', 'resources/scss/global/_nav--DEMO.scss');
			this.copy('resources/js/demo.js', 'resources/js/demo.js');

		}

		// Add copy task
		if (this.features.indexOf('createDevFolder') != -1 || this.features.indexOf('installDocs') != -1) {
			this.copy('helpers/_grunt/_copy.js', 'helpers/_grunt/copy.js');
		}

		// Add IE Styles
		if (this.features.indexOf('supportIE8') != -1) {
			this.copy('resources/scss/ie8.scss', 'resources/scss/ie8.scss');
		}

	} else {
		this.copy('helpers/_grunt/bgShell.js', 'helpers/_grunt/bgShell.js');
		this.copy('config.rb', 'config.rb');
	}
};


/**
 * JS Libraries file generation
 *
 */
PrototypeGenerator.prototype.appJSLibs = function appJSLibs() {
// Add JS files for libraries
	if (this.jsLibs && this.jsLibs.length > 0) {
		if (this.jsLibs.indexOf('requirejs') != -1) {
			this.template('resources/js/_main.js', 'resources/js/main.js');
			this.copy('resources/js/app.js', 'resources/js/app.js');
		}
	}
};


/**
 * Bower file generation
 *
 */
PrototypeGenerator.prototype.appBower = function appBower() {
	this.copy('_bower.json', 'bower.json');
};

/**
 * Gruntfile and package.json file generation
 *
 */
PrototypeGenerator.prototype.appSettingFiles = function appSettingFiles() {
	this.template('_package.json', 'package.json');
	this.template('Gruntfile.js', 'Gruntfile.js');
};

/**
 * Stringify an object and normalize whitespace with project preferences.
 */

PrototypeGenerator.prototype.normalizeJSON = function () {
	var pkgFile = path.join(this.destinationRoot(process.cwd()), 'package.json');
	var pkgObj = this.read(pkgFile);
	this.conflicter.force = true;
	this.write('package.json', JSON.stringify(JSON.parse(pkgObj), null, 2));
};
