const { Router } = require("express");
const categories = require("../controllers/categories");

const routes = Router();

routes.get("/categoria", categories.getCategories);

module.exports = routes;
