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
		this.directory(
			this.generatorSrcPath + 'scss/docs',
			this.srcPath + 'scss/docs'
		);
		this.copy(
			this.generatorSrcPath + 'scss/docs.scss',
			this.srcPath + 'scss/docs.scss'
		);
		if (this.templateEngine !== '') {
			this.template(
				this.generatorSrcPath + 'templating/docs/index.hbs.ejs',
				this.srcPath + 'templating/docs/index.hbs'
			);
		}
	}
	if (this.docs.indexOf(htmlDocsId) === -1) delete this.bowerFile['dependencies']['highlightjs'];

	if (this.docs && this.docs.indexOf(jsDocsId) !== -1) {
		this.copy(
			this.generatorHelperPath + 'task-configs/jsdoc.conf.json',
			this.helperPath + 'task-configs/jsdoc.conf.json'
		);
		this.copy(
			this.generatorSrcPath + 'js/README.md',
			this.srcPath + 'js/README.md'
		);

		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.copy(
				this.generatorGruntPath + 'jsdoc.js',
				this.gruntPath + 'jsdoc.js'
			);
		}
	}

	if (this.docs && this.docs.indexOf(sassDocsId) !== -1) {
		this.copy(
			this.generatorHelperPath + 'task-configs/sassdoc.conf.json',
			this.helperPath + 'task-configs/sassdoc.conf.json'
		);

		if (this.taskRunner.indexOf('grunt') !== -1) {
			this.copy(
				this.generatorGruntPath + 'sassdoc.js',
				this.gruntPath + 'sassdoc.js'
			);
		}
	}

	if (this.taskRunner.indexOf('gulp') !== -1 && this.docs && (this.docs.indexOf(sassDocsId) !== -1 || this.docs.indexOf(jsDocsId) !== -1)) {

		this.template(
			this.generatorGulpPath + '_docs.js.ejs',
			this.gulpPath + 'docs.js'
		);
	}
};