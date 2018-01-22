'use strict';

const chalk = require('chalk');
const helpers = require('./../lib/helpers.js');

exports.questions = function (obj) {
	let object = obj || {};
	object.defaults = object.defaults !== false;

	return [
		{
			when: function (answers) {
				let taskRunner = answers.taskRunner || obj.taskRunner;

				return taskRunner === 'grunt';
			},
			name: 'gruntModules',
			type: 'checkbox',
			message: 'Which Grunt-Plugins do you want to use?',
			choices: [
				{ name: 'grunt-accessibility' },
				{ name: 'grunt-autoprefixer', checked: object.defaults },
				{ name: 'grunt-bless' },
				{ name: 'grunt-combine-mq', checked: object.defaults },
				{ name: 'grunt-contrib-handlebars' },
				{ name: 'grunt-contrib-htmlmin' },
				{ name: 'grunt-csscomb' },
				{ name: 'grunt-dr-svg-sprites' },
				{ name: 'grunt-grunticon' },
				{ name: 'grunt-image-size-export' },
				{ name: 'grunt-phantomas' },
				{ name: 'grunt-photobox' },
				{ name: 'grunt-postcss-separator' },
				{ name: 'grunt-responsive-images' },
				{ name: 'grunt-svgmin' },
				{ name: 'grunt-webfont' }
			],
			default: this.config.get('gruntModules')
		}
	];
};

exports.setup = function () {
	helpers.definePaths.call(this);
	this.gruntModules = this.config.get('gruntModules') || [];

};

exports.scaffold = function (obj) {
	let object = obj || {};
	object.defaults = object.defaults !== false;

	if (this.taskRunner === 'grunt') {
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_browserify.js.ejs'),
			this.gruntPath + 'browserify.js',
			this
		);

		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_uglify.js.ejs'),
			this.gruntPath + 'uglify.js',
			this
		);
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-contrib-uglify' ];
	}

	// Grunt modules are splitted up in separate files and modules
	if (this.gruntModules.indexOf('grunt-accessibility') != -1) {
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'accessibility.js'),
			this.gruntPath + 'accessibility.js'
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-accessibility' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-accessibility' ];
	}

	if (this.gruntModules.indexOf('grunt-autoprefixer') != -1) {
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + 'postcss.js.ejs'),
			this.gruntPath + 'postcss.js',
			this
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-postcss' ], { 'saveDev': true });
		}
	}

	if (this.gruntModules.indexOf('grunt-bless') != -1) {
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'bless.js'),
			this.gruntPath + 'bless.js'
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-bless' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-bless' ];
	}
	if (this.gruntModules.indexOf('grunt-browser-sync') != -1) {
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_browserSync.js.ejs'),
			this.gruntPath + 'browserSync.js',
			this
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-browser-sync' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-browser-sync' ];
	}

	if (this.gruntModules.indexOf('grunt-csscomb') != -1) {
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'csscomb.js'),
			this.gruntPath + 'csscomb.js'
		);
		this.fs.copy(
			this.templatePath(this.generatorHelperPath + 'tasks/csscomb.config.json'),
			this.helperPath + 'tasks/csscomb.config.json'
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-csscomb' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-csscomb' ];
	}
	if (this.gruntModules.indexOf('grunt-contrib-handlebars') != -1 ||
		this.taskRunner.indexOf('grunt') !== -1 && this.projectType === 'static-page-app') {
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'handlebars.js'),
			this.gruntPath + 'handlebars.js'
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-contrib-handlebars' ], { 'saveDev': true });

			this.log(('\n') + chalk.bgRed('Please add the following lines to your Gruntfile.js to your custom tasks: ') + ('\n') +
				chalk.yellow('\n grunt.registerTask(\'jsTemplates\', [') +
				chalk.yellow('\n    \'handlebars\',') +
				chalk.yellow('\n    \'replace:jsTemplates\'' +
					chalk.yellow('\n ]);') + ('\n') + ('\n'))
			);
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-contrib-handlebars' ];
	}
	if (this.gruntModules.indexOf('grunt-contrib-htmlmin') != -1) {
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'htmlmin.js'),
			this.gruntPath + 'htmlmin.js'
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-contrib-htmlmin' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-contrib-htmlmin' ];
	}
	if (this.gruntModules.indexOf('grunt-contrib-requirejs') != -1) {
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'requirejs.js'),
			this.gruntPath + 'requirejs.js'
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-contrib-requirejs' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-contrib-requirejs' ];
	}

	if (this.gruntModules.indexOf('grunt-combine-mq') != -1) {
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'combine_mq.js'),
			this.gruntPath + 'combine_mq.js'
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-combine-mq' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-combine-mq' ];
	}

	if (this.gruntModules.indexOf('grunt-dr-svg-sprites') != -1) {
		this.fs.copy(
			this.templatePath('gitkeep'),
			this.srcPath + 'shared/styles/icons/.gitkeep'
		);
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_dr-svg-sprites.js.ejs'),
			this.gruntPath + 'dr-svg-sprites.js', this
		);
		this.fs.copy(
			this.templatePath(this.generatorHelperPath + 'templates/svg-sprites/stylesheet.hbs'),
			this.helperPath + 'templates/svg-sprites/stylesheet.hbs'
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-dr-svg-sprites' ], { 'saveDev': true });

			this.log(('\n') + chalk.bgRed('Please add the following line to your Gruntfile.js file in line 22 (require())') + ('\n') +
				chalk.yellow('\n "svg-sprites": "grunt-dr-svg-sprites"') + ('\n') +
				chalk.bgRed('\n Please add the following lines to your Gruntfile.js to your custom tasks:') + ('\n') +
				chalk.yellow('\n grunt.registerTask(\'sprites\', [') +
				chalk.yellow('\n    \'svg-sprites\',') +
				chalk.yellow('\n    \'replace:spriteUrl\'' +
					chalk.yellow('\n ]);') + ('\n') + ('\n'))
			);
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-dr-svg-sprites' ];
	}

	if (this.gruntModules.indexOf('grunt-grunticon') != -1) {
		this.fs.copy(
			this.templatePath('gitkeep'),
			this.srcPath + 'shared/styles/icons/.gitkeep'
		);
		this.fs.copy(
			this.templatePath(this.generatorHelperPath + 'templates/grunticon/stylesheet.hbs'),
			this.helperPath + '/templates/grunticon/stylesheet.hbs'
		);
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_grunticon.js.ejs'),
			this.gruntPath + 'grunticon.js', this);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-grunticon' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-grunticon' ];
	}
	if (this.gruntModules.indexOf('grunt-image-size-export') != -1) {
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'imageSizeExport.js'),
			this.gruntPath + 'imageSizeExport.js'
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-image-size-export' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-image-size-export' ];
	}
	if (this.gruntModules.indexOf('grunt-includes') != -1) {
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'includes.js'),
			this.gruntPath + 'includes.js'
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-includes' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-includes' ];
	}
	if (this.gruntModules.indexOf('grunt-modernizr') != -1) {
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'modernizr.js'),
			this.gruntPath + 'modernizr.js'
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-modernizr' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-modernizr' ];
	}
	if (this.gruntModules.indexOf('grunt-phantomas') != -1) {
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'phantomas.js'),
			this.gruntPath + 'phantomas.js'
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-phantomas' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-phantomas' ];
	}
	if (this.gruntModules.indexOf('grunt-photobox') != -1) {
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + 'photobox.js'),
			this.gruntPath + 'photobox.js',
			this
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-photobox' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-photobox' ];
	}
	if (this.gruntModules.indexOf('grunt-responsive-images') != -1) {
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'responsive_images.js'),
			this.gruntPath + 'responsive_images.js'
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-responsive-images' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-responsive-images' ];
	}
	if (this.gruntModules.indexOf('grunt-svgmin') != -1) {
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'svgmin.js'),
			this.gruntPath + 'svgmin.js'
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-svgmin' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-svgmin' ];
	}

	if (this.gruntModules.indexOf('grunt-webfont') != -1) {
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'webfont.js'),
			this.gruntPath + 'webfont.js'
		);
		this.fs.copy(
			this.templatePath(this.generatorGruntPath + 'custom/iconbuilder.js'),
			this.gruntPath + 'custom/iconbuilder.js'
		);
		this.fs.copy(
			this.templatePath('gitkeep'),
			this.helperPath + '/templates/webfont/.gitkeep'
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-webfont' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) {
			delete this.pkgFile[ 'devDependencies' ][ 'grunt-webfont' ];
			delete this.pkgFile[ 'devDependencies' ][ 'fs-extra' ];
		}
	}

	if (this.gruntModules.indexOf('grunt-grunticon') != -1 ||
		this.gruntModules.indexOf('grunt-dr-svg-sprites') != -1 ||
		this.gruntModules.indexOf('grunt-contrib-handlebars') != -1 ||
		this.taskRunner.indexOf('grunt') !== -1 && this.projectType === 'static-page-app') {
		this.fs.copyTpl(
			this.templatePath(this.generatorGruntPath + '_replace.js.ejs'),
			this.gruntPath + 'replace.js',
			this
		);

		if (object.installDeps) {
			this.npmInstall([ 'grunt-text-replace' ], { 'saveDev': true });
		}
	} else {
		if (this.pkgFile) delete this.pkgFile[ 'devDependencies' ][ 'grunt-text-replace' ];
	}

	if (this.gruntModules.indexOf('grunt-grunticon') != -1 && this.gruntModules.indexOf('grunt-postcss-separator') != -1) {
		this.fs.copy(
			this.templatePath(this.generatorSrcPath + 'shared/scripts/vendor/loadCSS.js'),
			this.srcPath + 'shared/scripts/vendor/loadCSS.js'
		);
	}
};

exports.postInstall = function () {
	helpers.deleteSettingsFile();
};