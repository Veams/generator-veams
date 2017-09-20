import { Router } from 'express';

// // Routes
import index from './home';
import apiServerHosts from './api-server-hosts';

const router = new Router();

// Basic routes
router.get('/', index);


// Additional routes
router.use([apiServerHosts]);


module.exports = router;