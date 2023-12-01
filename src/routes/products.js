const { Router } = require('express');

const products = require('../controllers/products');
const verifyLogin = require('../middlewares/authenticated');

const routes = Router();

routes.use(verifyLogin);
routes.post('/produto', products.createProduct);
routes.put('/produto/:id', products.updateProduct);
routes.get('/produto/:id', products.detailProduct);
routes.get('/produto', products.getProduct);

module.exports = routes;
