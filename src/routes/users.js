const { Router } = require('express');

const users = require('../controllers/users');
const verifyLogin = require('../middlewares/authenticated');

const routes = Router();

routes.post('/usuario', users.createUser);
routes.post('/login', users.login);

routes.use(verifyLogin);
routes.put('/usuario', users.updateUser);

module.exports = routes;
