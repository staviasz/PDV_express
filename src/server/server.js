const express = require("express");
const cors = require("cors");
const userRoutes = require("../routes/users");
const categoryRoutes = require("../routes/categories");
const productRoutes = require("../routes/products");
const clientRoutes = require("../routes/clients");
const orderRoutes = require("../routes/orders");

const app = express();

app.use(express.json());
app.use(cors());

app.use(categoryRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(clientRoutes);
app.use(orderRoutes);

module.exports = app;
