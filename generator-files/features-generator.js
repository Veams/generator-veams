var devFolderId = 'createDevFolder';

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

	// Add Dev Folder
	if (this.features.indexOf(devFolderId) != -1) {
		this.mkdir('_dist');
	}

	// Grunt & Gulp
	if (this.taskRunner.indexOf('grunt') !== -1) {
		// Add copy task
		if (this.features.indexOf('createDevFolder') != -1) {
			this.copy('helpers/_grunt/_copy.js.ejs', 'helpers/_grunt/copy.js');
		}
	}
};