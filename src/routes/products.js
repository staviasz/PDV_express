const { Router } = require('express');

const products = require('../controllers/products');
const verifyLogin = require('../middlewares/authenticated');

const routes = Router();

routes.use(verifyLogin);
routes.get('/produto', products.getProduct);
routes.post('/produto', products.createProduct);
routes.put('/produto/:id', products.updateProduct);
routes.get('/produto/:id', products.detailProduct);
routes.delete('/produto/:id', products.delProduct);

module.exports = routes;
