const { Router } = require('express');

const clients = require('../controllers/clients');
const verifyLogin = require('../middlewares/authenticated');

const routes = Router();

routes.use(verifyLogin);

routes.post('/cliente', clients.registerClient);

module.exports = routes;
