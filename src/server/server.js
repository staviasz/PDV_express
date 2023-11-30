const express = require('express');
const userRoutes = require('../routes/users');
const categoryRoutes = require('../routes/categories');
const clientRoutes = require('../routes/clients');

const app = express();

app.use(express.json());

app.use(categoryRoutes);
app.use(userRoutes);
app.use(clientRoutes);

module.exports = app;
