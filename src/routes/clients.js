const { Router } = require("express");

const clients = require("../controllers/clients");
const verifyLogin = require("../middlewares/authenticated");

const routes = Router();

routes.use(verifyLogin);

routes.post("/cliente", clients.registerClient);
routes.put("/cliente/:id", clients.updateClient);
routes.get("/cliente/:id", clients.getClient);
routes.get("/cliente", clients.listClients);

module.exports = routes;
