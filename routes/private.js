const router = require('express');
const controllerPrivate = require('../controller/privatecontroller');

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = router.Router();
// Add routes
routes.get('/' ,controllerPrivate.getPrivate);

module.exports = routes;
