import { Router } from 'express'
import { create, index, show, update, destroy } from './controller'
export Example, { schema } from './model'

const router = new Router();

/**
 * @api {post} /api/examples Create example
 * @apiName CreateExample
 * @apiGroup Example
 * @apiParam id Example ID
 * @apiParam project_id Project's ID
 * @apiParam lang Example language
 * @apiParam status content status (published|preview|master)
 * @apiSuccess {Object} content Example's data.
 * @apiError {Object} 422 Some parameters may contain invalid values.
 * @apiError 404 Example not found.
 */
router.post('/', create);

/**
 * @api {get} /api/examples? Retrieve examples
 * @apiName RetrieveExamples
 * @apiGroup Example
 * @apiUse listParams
 * @apiSuccess {Object[]} contents List of contents.
 * @apiError {Object} 422 Some parameters may contain invalid values.
 */
router.get('/', index);

/**
 * @api {get} /api/examples/:id Retrieve content
 * @apiName RetrieveExample
 * @apiGroup Example
 * @apiSuccess {Object} content Example's data.
 * @apiError {Object} 422 Some parameters may contain invalid values.
 * @apiError 404 Example not found.
 */
router.get('/:id', show);

/**
 * @api {put} /api/examples/:id Update content
 * @apiName UpdateExample
 * @apiGroup Example
 * @apiSuccess {Object} content Example's data.
 * @apiError {Object} 422 Some parameters may contain invalid values.
 * @apiError 404 Example not found.
 */
router.put('/:id', update);

/**
 * @api {delete} /api/examples/:id Delete content
 * @apiName DeleteExample
 * @apiGroup Example
 * @apiSuccess (Success 204) 204 No Example.
 * @apiError 404 Example not found.
 */
router.delete('/:id', destroy);

export default router;
