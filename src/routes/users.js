const { Router } = require('express');

const users = require('../controllers/users');

const routes = Router();

routes.put('/login', users.login);

module.exports = routes;
