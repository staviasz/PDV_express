const { Router } = require('express');

const products = require('../controllers/products');
// const verifyLogin = require('../middlewares/authenticated');

const routes = Router();

routes.post('/produto', products.createProduct);
// routes.use(verifyLogin);

module.exports = routes;
