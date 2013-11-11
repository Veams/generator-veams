'use strict';
var util = require('util');
var path = require('path');
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
        projectName: "",
        githubUser: "Prototype",
        installPlugin: true,
        installCMS: true,
        author: {
            name: this.user.git.username || process.env.user || process.env.username,
            login: "Prototype",
            email: this.user.git.email
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
        '\n  ^^^^^^^^^^ ' +
            '\n | ___  ___ |     _____________________' +
            '\n |  ' + 'U ' + '   U' + '  |' + '    /' + '                     \\  ' +
            '\n <' + '    VV' + '    >  _/   Apertos Prototype!  \\ ' +
            '\n |   ____   |   \\  Make your life easy  / ' +
            '\n \\__________/    \\_____________________/ ' +
            '\n   |      |' +
            '\n  ';



    var force = false;
    if (!this.config.existed) {
        force = true;
    }
    if (!this.options['skip-welcome-message']) {
        console.log(this.yeoman);
        console.log(welcome);
    }
    var questions = [];

    (!this.config.get("projectName") || force) && questions.push({
        type: "input",
        name: "projectName",
        message: "Your project name",
        default: this.appname
    });

    (!this.config.get("installPlugin") || force) && questions.push({
        type: "confirm",
        name: "installPlugin",
        message: "Would you want to install an assemble plugin?",
        default: this.config.get("installPlugin")
    });

    questions.push({
        name: "plugin",
        type: "checkbox",
        message: "Which Assemble Plugin do you want to use?",
        choices: [
            { name: "permalinks"},
            { name: "assemble-contrib-contextual" },
            { name: "assemble-contrib-sitemap", checked: true },
            { name: "assemble-markdown-data" },
            { name: "assemble-related-pages",  checked: true }
        ],
        when: function (answers) {
            return answers.installPlugin;
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
        type: "checkbox",
        message: "Which CMS snippets do you want to use?",
        choices: [
            { name: "TYPO3"},
            { name: "Drupal", checked: true },
            { name: "Magnolia"},
            { name: "CoreMedia"}
        ],
        when: function (answers) {
            return answers.installCMS;
        }
    });

    this.prompt(questions, function (answers) {

        this.projectName = answers.projectName || this.config.get("projectName");
        this.plugin = answers.plugin;
        this.CMS = answers.CMS;
        this.authorName = this.config.get("author").name;
        this.authorEmail = this.config.get("author").email;

        //save config to .yo-rc.json
        this.config.set(answers);

        done();
    }.bind(this));
};

/**
 * Now copy all checked files and create directories
 */

PrototypeGenerator.prototype.app = function app() {
    var files = this.files;

    // Copy standard files
    this.copy('_package.json', 'package.json');
    this.copy('config.rb', 'config.rb');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('gitignore', '.gitignore');
    this.copy('README.md', 'README.md');

    this.directory('_demo', '_demo');

    // add resources
    this.mkdir('resources');
    this.directory('resources/data', 'resources/data');
    this.directory('resources/content', 'resources/content');

    this.mkdir('resources/templates');
    this.directory('resources/templates/layouts', 'resources/templates/layouts');
    this.directory('resources/templates/pages', 'resources/templates/pages');
    this.mkdir('resources/templates/partials');
    this.copy('resources/templates/partials/nav.hbs');

    // add specific resources to make it possible to split up some directories
    this.mkdir('resources/js');
    this.mkdir('resources/img');
    this.mkdir('resources/scss');
    this.directory('resources/scss/global', 'resources/scss/global');
    this.directory('resources/scss/icons', 'resources/scss/icons');
    this.directory('resources/scss/modules', 'resources/scss/modules');
    this.directory('resources/scss/utils', 'resources/scss/utils');
    this.copy('resources/scss/_all.scss', 'resources/scss/_all.scss');
    this.copy('resources/scss/styles-svg.scss', 'resources/scss/styles-svg.scss');
    this.copy('resources/scss/styles-png.scss', 'resources/scss/styles-png.scss');

    // now some special stuff
    if(this.CMS == 'Drupal') {
        this.directory('resources/scss/drupal', 'resources/scss/drupal');
        this.directory('resources/templates/partials/drupal', 'resources/templates/partials/drupal');
    }

    /* files.forEach(function (file) {
        if (this.dotFiles.indexOf(file) !== -1) {
            this.copy(file, '.' + file);
        } else if (this.pkgFiles.indexOf(file) !== -1) {
            this.template(file, file.substring(1));
        } else {
            if (path.basename(file, '.js') === 'Gruntfile') {
                this.template('Gruntfile.js');
            } else {
                this.copy(file, file);
            }
        }
    }, this);
    */
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
