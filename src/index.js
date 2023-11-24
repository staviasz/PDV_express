require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('teste inicial'));

app.listen(process.env.PORT_APP);
