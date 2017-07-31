'use strict';

const devFolderId = 'createDevFolder';

exports.questions = function () {
	return {
		name: 'features',
		type: 'checkbox',
		message: 'Do you need anything special?',
		choices: [
			{
				name: 'Dev-Output & Dist-Output?',
				value: devFolderId,
				checked: true
			}
		],
		default: this.config.get('features')
	};
};

exports.setup = function () {
	this.features = this.config.get('features') || [];
};

exports.scaffold = function () {
	// Grunt & Gulp
	if (this.taskRunner.indexOf('grunt') !== -1) {
		// Add copy task
		if (this.features.indexOf('createDevFolder') != -1) {
			this.fs.copyTpl(
				this.templatePath(this.generatorGruntPath + '_copy.js.ejs'),
				this.gruntPath + 'copy.js',
				this
			);
		} else {
			delete this.pkgFile['devDependencies']['grunt-contrib-copy'];
		}
	} else {
		delete this.pkgFile['devDependencies']['grunt-contrib-copy'];
	}
};