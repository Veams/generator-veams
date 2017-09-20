import { Router } from 'express';

// // Routes
import home from './home';
import apiServerHosts from './api-server-hosts';

const router = new Router();

// Basic routes
router.get('/', home);


// Additional routes
router.use([apiServerHosts]);


module.exports = router;