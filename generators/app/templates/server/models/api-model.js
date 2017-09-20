/**
 * Created by sven.friedemann on 07.04.17.
 */

const fs = require('fs');
const pathFs = require('path');
import config from '../configs/config';

class ApiModel {

	constructor() {
		this.data = {
			'edit_timestamp': new Date().getTime(),
			'author': 'api'
		};

		this.mockPath = pathFs.join(config.root, config.mockPath);
		this.filename = '';
		this.modelDir = '';
	}

	get data() {
		return this._data;
	}

	set data(data) {
		this._data = Object.assign(this.data || {}, data);
	}

	create(params) {
		this.data = params;
		return this;
	}

	view() {
		return this.data;
	}

	async save(data) {
		await this.remove();
		await this.create(data);

		return this;
	}

	remove() {
	}

	get mockDir() {
		if (this.data === null) {
			throw new Error('Invalid data');
		}

		return pathFs.join(this.mockPath, this.data.id);
	}

	/**
	 * @TODO Remove Promise, return null instead
	 * @param id
	 * @returns {Promise}
	 */
	findById(id) {
		let path = this.mockPath + '/' + id;
		let filePath = path + '/' + this.filename;

		return new Promise((resolve, reject) => {
			if (!fs.existsSync(path) && !fs.existsSync(filePath)) {

				reject('File ' + id + ' doesn\'t exist');
			}

			this.data = fs.readFileSync(filePath, 'utf-8');
			resolve(this);
		});
	}

	findAll() {
		return new Promise((resolve,reject) => {
			let dirs = fs.readdirSync(this.modelPath)
				.filter(fileOrFolder => fs.statSync(pathFs.join(this.modelPath, fileOrFolder)).isDirectory());
			let collection = [];
			dirs.forEach((dir) => {
				let model = this;

				model.findById(dir)
					.then(() => {
						collection.push(model);
						if(collection.length == dirs.length) {
							resolve(collection);
						}
					});
			});
		});
	}
}

export default ApiModel;