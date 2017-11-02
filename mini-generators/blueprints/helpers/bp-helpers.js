const fsx = require('fs-extra');
const helpers = require('../../../lib/helpers');

module.exports = {
	prepareFiles: (files, path) => {
		let collection = {};
		files = files.sort();

		for (let i = 0; i < files.length; i++) {
			let fileOrFolder = fsx.statSync(files[i]);

			if (fileOrFolder.isFile()) {
				let cleanedPath = files[i].replace(path, '');
				collection[cleanedPath] = {
					absolutePath: cleanedPath,
					relativePath: `${path}${cleanedPath}`
				};
			}
		}

		return collection;
	},
	prepareFilesForPrompt: function prepareFilesForPrompt(collection, bpName) {
		let files = Object.keys(collection);
		let choices = [];

		for (let i = 0; i < files.length; i++) {
			let name = helpers.deleteFileExtension(files[i]).replace('bp', bpName);
			let choice = {
				name: `${name} file`,
				value: files[i]
			};

			choices.push(choice);
		}

		return choices;
	}
};