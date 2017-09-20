import fs from 'fs';
import * as pathFs from 'path';
import helpers from '../../utils/helpers';
import ApiModel from '../../models/api-model';

class Example extends ApiModel {

	constructor(obj) {
		super(obj);
		this.modelDir = `${this.mockPath}/example`;
	}

	/**
	 * Get metadata example file path
	 * @returns {string}
	 */
	get exampleFile() {
		return `${this.modelDir}/${this.data.id}.json`;
	}

	/**
	 * Create example file
	 * @param params
	 * @returns {Example}
	 */
	async create(params) {
		super.create(params);

		if(await helpers.fileExists(this.exampleFile)) {
			throw new Error('Example '+ this.data.id + ' already exists');
		}

		await helpers.write(this.exampleFile, JSON.stringify(this.data));

		return this;
	}

	/**
	 * Find all example files
	 * @returns {Promise}
	 */
	async findAll() {
		let dirs = fs.readdirSync(`${this.modelDir}`);
		let promises = [];


		for(let i = 0; i < dirs.length; i++ ) {
			let example = new Example();
			let id = pathFs.basename(dirs[i], '.json');

			promises.push(example.findById(id));
		}

		return Promise.all(promises);
	}

	/**
	 * Find Example by id
	 * @param id
	 * @returns {*}
	 */
	async findById(id) {
		this.data.id = id;

		if (!await helpers.fileExists(this.exampleFile)) {
			return null
		}

		this.data = await helpers.readJSON(this.exampleFile);

		return this;
	}

	/**
	 *
	 * @param data
	 * @returns {Example}
	 */
	async save(data) {
		if(data.id !== this.data.id) {
			throw new Error(`Can\'t rename example id ${this.data.id} to ${data.id}!`);
		}

		this.data = data;
		await helpers.write(this.exampleFile, JSON.stringify(this.data));

		return this;
	}

	remove() {
		return helpers.remove(this.exampleFile);
	}
}


export default Example;
