const fsx = require('fs-extra');
const path = require('path');
const helpers = require('../../../lib/helpers');

module.exports = {
	prepareFiles: (files, filepath) => {
		let collection = {};
		files = files.sort();

		for (let i = 0; i < files.length; i++) {
			let fileOrFolder = fsx.statSync(files[i]);

			if (fileOrFolder.isFile()) {
				let cleanedPath = files[i].replace(filepath, '');
				collection[cleanedPath] = {
					absolutePath: cleanedPath,
					relativePath: path.join(`${filepath}`)
				};
			}
		}

		return collection;
	},
	prepareFilesForPrompt: function prepareFilesForPrompt(currentBpPath, collection, bpName) {
		let files = Object.keys(collection);
		let choices = [];

		for (let i = 0; i < files.length; i++) {
			let name = path.normalize(helpers.deleteFileExtension(files[i]))
				.replace('bp', bpName)
				.replace(path.normalize(currentBpPath), '');
			let choice = {
				name: `${name} file`,
				value: path.normalize(files[i]).replace(path.normalize(currentBpPath), '')
			};

			choices.push(choice);
		}

		return choices;
	}
};