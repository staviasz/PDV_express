const { Router } = require('express');
const users = require('../controllers/users')

const routes = Router();

routes.post('/usuario', users.createUser);

module.exports = routes;