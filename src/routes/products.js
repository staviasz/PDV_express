const { Router } = require("express");

const products = require("../controllers/products");
const verifyLogin = require("../middlewares/authenticated");
const multer = require("../configs/multer");

const routes = Router();

routes.use(verifyLogin);
routes.get("/produto", products.getProduct);
routes.post(
  "/produto",
  multer.single("produto_imagem"),
  products.createProduct,
);
routes.put(
  "/produto/:id",
  multer.single("produto_imagem"),
  products.updateProduct,
);
routes.get("/produto/:id", products.detailProduct);
routes.get("/produto", products.getProduct);
routes.delete("/produto/:id", products.delProduct);

module.exports = routes;
