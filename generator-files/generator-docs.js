'use strict';

var pg = require('./../lib/helpers.js');
var jsDocsId = 'jsdoc';
var sassDocsId = 'sassdoc';
var htmlDocsId = 'htmldoc';

exports.questions = function () {
	return {
		name: 'docs',
		type: 'checkbox',
		message: 'Do you want to add documentation?',
		choices: [
			{
				name: 'JavaScript Documentation with JSDoc',
				value: jsDocsId,
				checked: false
			},
			//{
			//	name: 'Sass Documentation with SassDoc',
			//	value: sassDocsId,
			//	checked: false
			//},
			{
				name: 'HTML Documentation with Assemble',
				value: htmlDocsId,
				checked: false
			}
		],
		default: this.config.get('docs')
	};
};

exports.setup = function () {
	this.docs = this.config.get('docs') || [];
	pg.definePaths.call(this);
};

exports.scaffold = function () {
	if (this.docs.indexOf(htmlDocsId) !== -1) {
		this.fs.copy(
			this.templatePath(this.generatorSrcPath + 'scss/docs.scss'),
			this.srcPath + 'scss/docs.scss'
		);
		if (this.templateEngine !== '') {
			this.fs.copyTpl(
				this.templatePath(this.generatorSrcPath + 'templating/docs/index.hbs.ejs'),
				this.srcPath + 'templating/docs/index.hbs',
				this
			);
		}
	}
	if (this.docs.indexOf(htmlDocsId) === -1) delete this.bowerFile['dependencies']['highlightjs'];

	if (this.docs && this.docs.indexOf(jsDocsId) !== -1) {
		this.fs.copy(
			this.templatePath(this.generatorHelperPath + 'task-configs/jsdoc.conf.json'),
			this.helperPath + 'task-configs/jsdoc.conf.json'
		);
		this.fs.copy(
			this.templatePath(this.generatorSrcPath + 'js/README.md'),
			this.srcPath + 'js/README.md'
		);

		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.fs.copy(
				this.templatePath(this.generatorGruntPath + 'jsdoc.js'),
				this.gruntPath + 'jsdoc.js'
			);
		} else {
			delete this.pkgFile['devDependencies']['grunt-jsdoc'];
		}
	} else {
		delete this.pkgFile['devDependencies']['grunt-jsdoc'];
	}

	if (this.docs && this.docs.indexOf(sassDocsId) !== -1) {
		this.fs.copy(
			this.templatePath(this.generatorHelperPath + 'task-configs/sassdoc.conf.json'),
			this.helperPath + 'task-configs/sassdoc.conf.json'
		);

		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.fs.copy(
				this.templatePath(this.generatorGruntPath + 'sassdoc.js'),
				this.gruntPath + 'sassdoc.js'
			);
		} else {
			delete this.pkgFile['devDependencies']['grunt-sassdoc'];
		}
	} else {
		delete this.pkgFile['devDependencies']['grunt-sassdoc'];
	}

	if (this.taskRunner.indexOf('gulp') !== -1 && this.docs && (this.docs.indexOf(sassDocsId) !== -1 || this.docs.indexOf(jsDocsId) !== -1)) {

		this.fs.copyTpl(
			this.templatePath(this.generatorGulpPath + '_docs.js.ejs'),
			this.gulpPath + 'docs.js',
			this
		);
	} else {
		delete this.pkgFile['devDependencies']['gulp-jsdoc'];
		delete this.pkgFile['devDependencies']['sassdoc'];
	}
};