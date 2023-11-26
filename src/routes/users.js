const { Router } = require('express');
const { createUser } = require('../controllers/users')

const routes = Router();

routes.post('/usuario', createUser);

module.exports = routes;