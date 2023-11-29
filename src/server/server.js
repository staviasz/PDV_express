const express = require('express');
const userRoutes = require('../routes/users');

const app = express();

app.use(express.json());

app.use(userRoutes);

module.exports = app;
