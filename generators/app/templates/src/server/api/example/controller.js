import {success, notFound, validationError} from '../../services/response/';
import Example from './model';

export const create = (req, res) => {
	let example = new Example();
	example.create(req.body)
		.then((example) => example.view(true))
		.then(success(res, 201))
		.catch(validationError(res))
};

export const index = ({params}, res, next) => {
	let example = new Example();
	example.findAll(params)
		.then((examples) => examples.map((example) => example.view()))
		.then(success(res))
		.catch(next)
};

export const show = ({params}, res, next) => {
	let example = new Example();

	example.findById(params.id)
		.then(notFound(res))
		.then((example) => example ? example.view() : null)
		.then(success(res))
		.catch(next)
};

export const update = ({params, body}, res, next) => {
	let example = new Example();
	example.findById(params.id)
		.then(notFound(res))
		.then((example) => example ? example.save(body) : null)
		.then((example) => example ? example.view(true) : null)
		.then(success(res))
		.catch(validationError(res))
		.catch(next)
};

export const destroy = ({params}, res, next) => {
	let example = new Example();
	example.findById(params.id)
		.then(notFound(res))
		.then((example) => example ? example.remove() : null)
		.then(success(res, 204))
		.catch(next)
};
