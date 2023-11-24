require('dotenv').config();
const express = require('express');
const runMigrations = require('./database/runMigrations');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('teste inicial'));

runMigrations().then(() => {
  try {
    app.listen(process.env.PORT_APP);
  } catch (error) {
    throw new Error('Server error');
  }
});
