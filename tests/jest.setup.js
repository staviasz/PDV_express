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

  const clientsMock = [
    {
      nome: 'clienteUm',
      email: 'clente4@gmail.com',
      cpf: '53751122052',
      cep: '11662730',
      rua: 'Rua Álvaro de Azevedo',
      numero: '123',
      bairro: 'Martim de Sá',
      cidade: 'Caraguatatuba',
      estado: 'SP',
    },
    {
      nome: 'clienteDois',
      email: 'clente5@gmail.com',
      cpf: '19420812006',
      cep: '69314416',
      rua: 'Rua Sião',
      numero: '1234',
      bairro: 'Nova Canaã',
      cidade: 'Boa Vista',
      estado: 'RR',
    },
  ];

  const queries = [
    knex('usuarios').insert(userMock),
    knex('categorias').insert(categoryMock),
    knex('clientes').insert(clientsMock),
  ];

  await Promise.all(queries);

  const response = await testServer.post('/login').send({
    email: 'teste@jest.com',
    senha: '123456789',
  });

  global.token = `Bearer ${response.body.token}`;
  global.categories = categoryMock;
  global.clients = clientsMock;
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
