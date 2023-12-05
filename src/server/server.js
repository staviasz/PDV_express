const express = require("express");
const userRoutes = require("../routes/users");
const categoryRoutes = require("../routes/categories");
const productRoutes = require("../routes/products");
const clientRoutes = require("../routes/clients");

const app = express();

app.use(express.json());

app.use(categoryRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(clientRoutes);

module.exports = app;
