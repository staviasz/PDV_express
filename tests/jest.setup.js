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
  const userMock = {
    nome: 'testeJest',
    email: 'teste@jest.com',
    senha: hashedPassword,
  };
  const categoryMock = [
    { descricao: 'Informática' },
    { descricao: 'Celulares' },
    { descricao: 'Beleza e Perfumaria' },
    { descricao: 'Mercado' },
  ];

  await knex('categorias').insert(categoryMock);
  const queries = [knex('usuarios').insert(userMock)];

  await Promise.all(queries);

  const response = await testServer.post('/login').send({
    email: 'teste@jest.com',
    senha: '123456789',
  });
  global.token = `Bearer ${response.body.token}`;
  global.categories = categoryMock;

  global.user = userMock;
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
