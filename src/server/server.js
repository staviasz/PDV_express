const express = require('express');
const userRoutes = require('../routes/users');
const categoryRoutes = require('../routes/categories');

const app = express();

app.use(express.json());

app.use(categoryRoutes);
app.use(userRoutes);

module.exports = app;
