const { Router } = require("express");

const orders = require("../controllers/orders");
const verifyLogin = require("../middlewares/authenticated");

const routes = Router();

routes.use(verifyLogin);
routes.post('/pedido', orders.createOrder);
routes.get('/pedido', orders.listOrder);

module.exports = routes;
