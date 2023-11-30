const dbConfig = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(dbConfig[environment]);
const bcrypt = require('bcrypt');
const supertest = require('supertest');

const server = require('../src/server/server');
const { execSync } = require('child_process');
const testServer = supertest(server);

beforeAll(async () => {
  execSync('npx knex migrate:latest', {
    env: {
      ...process.env,
      NODE_ENV: 'test',
    },
  });
  const hashedPassword = await bcrypt.hash('123456789', 10);
  await knex('usuarios').insert({
    nome: 'testeJest',
    email: 'teste@jest.com',
    senha: hashedPassword,
  });
  const response = await testServer.post('/login').send({
    email: 'teste@jest.com',
    senha: '123456789',
  });
  global.token = `Bearer ${response.body.token}`;
});

afterAll(async () => {
  try {
    await knex('usuarios').where({ nome: 'testeJest' }).del();
  } catch (error) {
    console.error('Error during deletion:', error);
  }
  execSync('npx knex migrate:rollback', {
    env: {
      ...process.env,
      NODE_ENV: 'test',
    },
  });
  await knex.destroy();
});

module.exports = testServer;
