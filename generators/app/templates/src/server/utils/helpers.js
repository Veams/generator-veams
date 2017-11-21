/**
 * Represents Helper Functions.
 *
 * @author Sebastian Fitzner
 */
'use strict';

// Imports
import fs from 'fs-extra';
import mkdirp from 'mkdirp';
import path from 'path';

function readDir(dir) {
	return new Promise((resolve, reject) => {
		fs.readdir(dir, (err, files) => {
			if (err) {
				reject(err);
			} else {
				resolve(files);
			}
		});
	});
}

function writeFile(filepath, data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(filepath, data, 'utf8', (err) => {
			if (err) {
				reject(err);
			} else {
				resolve(filepath, data);
			}
		});
	});
}

function readFile(filepath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filepath, 'utf8', (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}

function readJSON(filepath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filepath, 'utf8', (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(JSON.parse(data));
			}
		});
	});
}

function write(filepath, data) {
	return new Promise((resolve, reject) => {
		mkdirp(path.dirname(filepath), function (err) {
			if (err) reject(err);
			else resolve(writeFile(filepath, data))
		});
	});
}

function fileExists(filepath) {
	return new Promise((resolve, reject) => {
		fs.stat(filepath, function fsStat(err, fileOrFolder) {
			if (err) {
				if (err.code === 'ENOENT') {
					resolve(false);
				} else {
					reject(err);
				}
			} else {
				resolve(fileOrFolder.isFile());
			}
		});
	});
}

function folderExists(filepath) {
	return new Promise((resolve, reject) => {
		fs.stat(filepath, function fsStat(err, fileOrFolder) {
			if (err) {
				if (err.code === 'ENOENT') {
					resolve(false);
				} else {
					reject(err);
				}
			} else {
				resolve(fileOrFolder.isDirectory());
			}
		});
	});
}

function remove(path) {
	return new Promise((resolve, reject) => {
		fs.remove(path, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve(path);
			}
		})
	})
}

export default {
	fileExists,
	folderExists,
	readDir,
	readFile,
	readJSON,
	remove,
	writeFile,
	write
};