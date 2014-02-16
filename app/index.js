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
        'jshintrc'
    ];

    this.pkgFiles = ['_package.json'];

    this.config.defaults({
        projectName   : "",
        projectAuthor: "",
		batchFiles: false,
        installPlugin : true,
        installCMS: false,
        author: {
            name        : "",
            login		: "",
            email       : ""
        }
    });

};

util.inherits(PrototypeGenerator, yeoman.generators.Base);

/**
 * Command prompt questions
 * Extend defaults and options based on user answers
 */



PrototypeGenerator.prototype.askFor = function askFor() {
    var done = this.async();

    // welcome message
    var welcome =
chalk.green('\n	            777                 ')+
chalk.green('\n               ~,,,,,,,?              ')+
chalk.green('\n             ,,:::,,7:77,             ')+
chalk.green('\n           7,,:::,,, :77I,7           ')+
chalk.green('\n          7,,:::,,,,7?::I,,           ')+
chalk.green('\n         7,,,:,,,,,,,:,:.,,7          ')+
chalk.green('\n         ,,,,,,,:,,,,:,,,,,,.7        ')+
chalk.green('\n        ,,,,,,,,,,...~~=.....,        ')+
chalk.green('\n       7,,,,,,~~~~===~==+=..7         ')+
chalk.green('\n       ,,,,,,??II?=.+~=,:~7           ')+
chalk.green('\n       ,,?,.,???II..=I?????7          ')+
chalk.green('\n       ??==I.,??III~??IIII??+    ')+ chalk.yellow('   Welcome ladies and gentlemen!')+
chalk.green('\n       ???+=I,,IIIII+?III??+=   ')+ chalk.yellow('    Want to make your life easy???')+
chalk.green('\n       7I??I?+??.,...++?+++=?   ')+ chalk.cyan('     _____         _       _            ')+   
chalk.green('\n         +II?=??..,...~~~==.    ')+ chalk.cyan('    |  _  |___ ___| |_ ___| |_ _ _ ___ __')+
chalk.green('\n            ..+??=.........7    ')+ chalk.cyan('    |   __|  _| . |  _| . |  _| | | . | -_|')+
chalk.green('\n           7,.:+++++??+=+       ')+ chalk.cyan('    |__|  |_| |___|_| |___|_| |_  |  _|___|')+
chalk.green('\n           7...==++++==+        ')+ chalk.cyan('     ____      _                |_|_|')+
chalk.green('\n               7+~====7         ')+ chalk.cyan('    |    \\ ___| |_ _ _ _ ___              ')+
chalk.green('\n           7+,,,,,:,,,.7        ')+ chalk.cyan('    |  |  | -_| | | |_`_| -_| ')+
chalk.green('\n         +,,,,,,,:,,,,,,,,:     ')+ chalk.cyan('    |____/|___|_|___|_,_|___|   ')+
chalk.green('\n       ,,,,,,,,::,?+,,,,,,+,,   ')+ chalk.cyan('      ')+
chalk.green('\n    7,,,,,,,,,,::=++:,,,,,:+,,,7')+ chalk.red('    Be sure you have installed the following')+
chalk.green('\n   7,:::,,,,,,,,,::::::,,,,,.,,,,7')+ chalk.red('  components: ')+
chalk.green('\n   ,,,,,,,,,.,,,:::::::,,,,,,,,,,7')+ chalk.red('   * compass:  http://compass-style.org/')+
chalk.green('\n   7,,,,,,,, ,,,::::::::,,,,,,,,,7 ')+ chalk.red('  * sass:     http://sass-lang.com/ ')+
chalk.green('\n    7,,,,,,,,,,,::::::::,,,,,,,,, ')+ chalk.red('   * ruby:     http://rubyinstaller.org/ ')+
chalk.green('\n      ,,,,,,,,I,,,,:::::,,,,,,,+I7 ')+ chalk.red('  * grunt:    http://gruntjs.com ')+
chalk.green('\n       I77777??.,:::,:::,,,,,,,?7 ')+ chalk.red('   * bower:    http://bower.io/')+
chalk.green('\n        I++?77I~,::::::,,,,,,,,+I7')+    
chalk.green('\n      7?I  77II.,,::,,,,,,,,,,,+I+  "WAAAAAAAAAAAHHHH!"')+
chalk.green('\n    777I+7 77II,::::,,,,,,,,,,++II    ')+
chalk.green('\n     7 7  77II?,::::,,,,,,,,,==+?+    ')+
chalk.green('\n     7II I?III.:::::,,,,,.,.,         ')+
chalk.green('\n   7 7++?I77?,:::::,,,,...,,,         ')+
chalk.green('\n           7,,:::::,,,..,,,,:         ')+
chalk.green('\n           ,,::::,,,,...,,,,          ')+
chalk.green('\n          7,::::,,,,,...,,,,          ')+
chalk.green('\n         7,:::::,,,,...,,,,7          ')+
chalk.green('\n         ,,::::,,,,....,,,,           ')+
chalk.green('\n        ,,:::::,,,,....,,,,           ')+
chalk.green('\n       7,:::::,,,,....,,,,,           ')+
chalk.green('\n       ,::::::,,,7..,,,,,,,           ')+
chalk.green('\n      ,::::::,,,,7.,,,,,,,,,          ')+
chalk.green('\n     ,:::::::,,,7..,,,,,::::::,7      ')+
chalk.green('\n    ,,:::,::,,,, ...,,,:,====~::~     ')+
chalk.green('\n    7,,,,,,,,,,, ,,,,,~=+++==~::~7    ')+
chalk.green('\n   ,:~~~~~:::,,: ...,,::~~~~~:::~7    ')+
chalk.green('\n  ,~======~~:::? 7,,...,,:::,,,:7     ')+
chalk.green('\n  :~===++==~:::=         I:~::~       ')+
chalk.green('\n  :~~~~~=~~:::~?                      ')+
chalk.green('\n  ::::~~~~::::~7                      ')+
chalk.green('\n   ,::::::::,:,                       ')+
chalk.green('\n    7::::::::7                        ')+ 
('\n ');
	
	
    var force = false;
    if (!this.config.existed) {
        force = true;
    }
    if (!this.options['skip-welcome-message']) {
        console.log(welcome);
    }
    var questions = [];

    (!this.config.get("projectName") || force) && questions.push({
        type    : "input",
        name    : "projectName",
        message : "Your project name",
        default : this.appname
    });

    (!this.config.get("projectAuthor") || force) && questions.push({
        type    : "input",
        name    : "projectAuthor",
        message : "Would you mind telling me your name?",
        default : this.config.get("projectAuthor")
    });

    (!this.config.get("projectURL") || force) && questions.push({
        type    : "input",
        name    : "projectURL",
        message : "Can you tell me a production environment URL?",
        default : this.config.get("projectURL")
    });

    (!this.config.get("batchFiles") || force) && questions.push({
        type    : "confirm",
        name    : "batchFiles",
        message : "Do you need batch files to start grunt?",
        default : this.config.get("batchFiles")
    });

    (!this.config.get("installDocs") || force) && questions.push({
        type    : "confirm",
        name    : "installDocs",
        message : "Do you want to use a styleguide documentation?",
        default : this.config.get("installDocs")
    });

    (!this.config.get("installAssemble") || force) && questions.push({
        type    : "confirm",
        name    : "installAssemble",
        message: "Would you want to install assemble?",
        default : this.config.get("installAssemble"),
    });
		
	(!this.config.get("installPlugin") || force) && questions.push({
		type    : "confirm",
		name    : "installPlugin",
		message: "Do you want to install assemble plugins?",
		default : this.config.get("installPlugin")
	});
	
    questions.push({
        name    : "plugin",
        type    : "checkbox",
        message: "Which assemble plugin do you want to use?",
        choices : [
            { name: "permalinks"},
            { name: "assemble-contrib-contextual" },
            { name: "assemble-contrib-sitemap"},
            { name: "assemble-markdown-data" },
            { name: "assemble-related-pages", checked: true }
        ],
        when: function( answers ) {
            return answers.installPlugin;
        }
    });    
	
	(!this.config.get("installModules") || force) && questions.push({
        type    : "confirm",
        name    : "installModules",
        message: "Would you want to install grunt modules?",
        default : this.config.get("installModules")
    });
	
    questions.push({
        name    : "modules",
        type    : "checkbox",
        message: "Which grunt modules do you want to use?",
        choices : [
            { name: "grunt-devtools", checked: true },
            { name: "grunt-grunticon", checked: true },
            { name: "dr-grunt-svg-sprites" },
            { name: "grunt-packager", checked: true },
            { name: "grunt-combine-media-queries", checked: true },
            { name: "grunt-bless", checked: true },
            { name: "grunt-contrib-compass" },
            { name: "grunt-browser-sync" },
            { name: "grunt-photobox"}
        ],
        when: function( answers ) {
            return answers.installModules;
        }
    });

    (!this.config.get("installCMS") || force) && questions.push({
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
    });

    this.prompt(questions, function (answers) {

        this.projectName = answers.projectName || this.config.get("projectName");
        this.authorLogin = answers.projectAuthor || this.config.get("projectAuthor");
        this.projectURL = answers.projectURL || this.config.get("projectURL");
        this.batchFiles = answers.batchFiles || this.config.get("batchFiles");
        this.installAssemble = answers.installAssemble || this.config.get("installAssemble");
        this.installDocs = answers.installDocs || this.config.get("installDocs");
        this.plugin = answers.plugin;
        this.modules = answers.modules;
        this.CMS = answers.CMS;
        this.authorName = this.config.get("author").name;
        this.authorEmail = this.config.get("author").email;

        //save config to .yo-rc.json
        this.config.set(answers);

        done();
    }.bind(this));
};

/**
 * TODO: Separate file generated with their own function. See test-creation.js
 * 
 */

PrototypeGenerator.prototype.app = function app() {

    var files = this.files;

    // Copy standard files
	this.mkdir('helper_files');
	this.copy('helper_files/htmlhintrc', 'helper_files/.htmlhintrc');
	
	this.mkdir('helper_files/grunt');
	this.copy('helper_files/grunt/bgShell.js', 'helper_files/grunt/bgShell.js');
	this.copy('helper_files/grunt/clean.js', 'helper_files/grunt/clean.js');
	this.copy('helper_files/grunt/concurrent.js', 'helper_files/grunt/concurrent.js');
	this.copy('helper_files/grunt/connect.js', 'helper_files/grunt/connect.js');
	this.copy('helper_files/grunt/htmlhint.js', 'helper_files/grunt/htmlhint.js');
	this.copy('helper_files/grunt/prettysass.js', 'helper_files/grunt/prettysass.js');
	this.copy('helper_files/grunt/sync.js', 'helper_files/grunt/sync.js');
	this.copy('helper_files/grunt/watch.js', 'helper_files/grunt/watch.js');
	
    this.copy('_package.json', 'package.json');
    this.copy('config.rb', 'config.rb');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('gitignore', '.gitignore');

    this.directory('_output', '_output');
	
	// add batch files
	if(this.config.get("batchFiles") == true) {
		this.directory('helper_files/batch_files', 'helper_files/batch_files');
	}

    // add resources
    this.mkdir('resources');
	
	// add assemble files 
	if(this.config.get("installAssemble") == true) {
		this.directory('resources/data', 'resources/data');
		this.directory('resources/content', 'resources/content');

		this.mkdir('resources/helpers');
		this.copy('resources/helpers/helper-for.js');

		this.mkdir('resources/templates');
		this.directory('resources/templates/layouts', 'resources/templates/layouts');
		this.directory('resources/templates/pages', 'resources/templates/pages');
		this.mkdir('resources/templates/partials');
		this.copy('resources/templates/partials/nav.hbs');
		this.mkdir('resources/templates/partials/_global');
		this.copy('resources/templates/partials/_global/head.hbs');
		
		this.copy('helper_files/grunt/assemble.js', 'helper_files/grunt/assemble.js');
	}
    // add specific resources to make it possible to split up some directories
    this.mkdir('_output/js');		
    this.mkdir('resources/js');
    this.mkdir('resources/scss');
    this.mkdir('resources/assets');
    this.mkdir('resources/assets/img');
    this.mkdir('resources/assets/img/temp');
    this.mkdir('resources/assets/img/svg');
    this.mkdir('resources/assets/img/svg/icons');
    this.mkdir('resources/assets/fonts');
    this.mkdir('resources/assets/media');
    this.directory('resources/scss/global', 'resources/scss/global');
    this.directory('resources/scss/modules', 'resources/scss/modules');
    this.directory('resources/scss/utils', 'resources/scss/utils');
    this.copy('resources/scss/_all.scss', 'resources/scss/_all.scss');
    this.copy('resources/scss/styles.scss', 'resources/scss/styles.scss');
    this.copy('resources/scss/styles-png.scss', 'resources/scss/styles-png.scss');
	
	// add styleguide files
	if(this.config.get("installDocs") == true) {
		this.directory('helper_files/styleguide-template', 'helper_files/styleguide-template');
		this.copy('resources/scss/styleguide.md', 'resources/scss/styleguide.md');
		this.copy('helper_files/grunt/styleguide.js', 'helper_files/grunt/styleguide.js');
		this.copy('helper_files/grunt/copy.js', 'helper_files/grunt/copy.js');
	}
	
	// CMS snippets and SCSS files
	//Drupal
    if(this.CMS == 'Drupal') {
        this.directory('resources/scss/drupal', 'resources/scss/drupal');
        this.directory('resources/templates/partials/drupal', 'resources/templates/partials/drupal');
    }
	//TYPO3
    if(this.CMS == 'TYPO3') {
        this.directory('resources/scss/typo3', 'resources/scss/typo3');
        this.directory('resources/templates/partials/typo3', 'resources/templates/partials/typo3');
    }
	//Magnolia
    if(this.CMS == 'Magnolia') {
        this.directory('resources/scss/magnolia', 'resources/scss/magnolia');
        this.directory('resources/templates/partials/magnolia', 'resources/templates/partials/magnolia');
    }
	//CoreMedia
    if(this.CMS == 'CoreMedia') {
        this.directory('resources/scss/coremedia', 'resources/scss/coremedia');
        this.directory('resources/templates/partials/coremedia', 'resources/templates/partials/coremedia');
    }
	// Grunt modules are splitted up in separate files and modules
	if(this.modules && this.modules.length > 0){
		if(this.modules.indexOf('grunt-grunticon') != -1) { 
			console.log(chalk.yellow('******************* grunticon *******************'));
			this.directory('resources/scss/icons', 'resources/scss/icons');
			this.directory('helper_files/templates', 'helper_files/templates');
			this.copy('helper_files/grunt/grunticon.js', 'helper_files/grunt/grunticon.js');
		}
		if(this.modules.indexOf('dr-grunt-svg-sprites') != -1) { 
			console.log(chalk.green('******************* dr-grunt-svg-sprites *******************'));
			this.mkdir('resources/scss/icons');
			this.copy('helper_files/grunt/svg-sprites.js', 'helper_files/grunt/svg-sprites.js');
		}
		if(this.modules.indexOf('grunt-packager') != -1) { 
			console.log(chalk.yellow('******************* grunt-packager *******************'));
			this.copy('resources/js/project.jspackcfg');
			this.copy('helper_files/grunt/packager.js', 'helper_files/grunt/packager.js');
		}
		if(this.modules.indexOf('grunt-combine-media-queries') != -1) { 
			console.log(chalk.green('******************* grunt-combine-media-queries *******************'));
			this.copy('helper_files/grunt/cmq.js', 'helper_files/grunt/cmq.js');
			this.copy('helper_files/grunt/cssmin.js', 'helper_files/grunt/cssmin.js');
		}
		if(this.modules.indexOf('grunt-bless') != -1) { 
			console.log(chalk.yellow('******************* grunt-bless *******************'));
			this.copy('helper_files/grunt/bless.js', 'helper_files/grunt/bless.js');
		}
		if(this.modules.indexOf('grunt-contrib-compass') != -1) { 
			console.log(chalk.green('******************* grunt-contrib-compass *******************'));
			this.copy('helper_files/grunt/compass.js', 'helper_files/grunt/compass.js');
		}
		if(this.modules.indexOf('grunt-browser-sync') != -1) { 
			console.log(chalk.yellow('******************* grunt-browser-sync *******************'));
			this.copy('helper_files/grunt/browser_sync.js', 'helper_files/grunt/browser_sync.js');
			this.copy('resources/templates/partials/_global/footer_scripts.hbs');
		}
		if(this.modules.indexOf('grunt-photobox') != -1) { 
			console.log(chalk.green('******************* grunt-photobox *******************'));
			this.copy('helper_files/grunt/photobox.js', 'helper_files/grunt/photobox.js');
		}
	}
}
/**
 * Stringify an object and normalize whitespace with project preferences.
 */

PrototypeGenerator.prototype.normalizeJSON = function () {
    var pkgFile = path.join(this.destinationRoot(process.cwd()), 'package.json');
    var pkgObj = this.read(pkgFile);
    this.conflicter.force = true;
    this.write('package.json', JSON.stringify(JSON.parse(pkgObj), null, 2));
};
