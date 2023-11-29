const testServer = require('../../jest.setup');
const dbConfig = require('../../../knexfile');
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(dbConfig[environment]);

const routeTest = async (body) => {
  return testServer.get('/categoria').send(body);
};

const categories = [
  { descricao: 'Informática' },
  { descricao: 'Celulares' },
  { descricao: 'Beleza e Perfumaria' },
  { descricao: 'Mercado' },
];

beforeAll(async () => {
  await knex('categorias').insert(categories);
});

describe('Categories', () => {
  it('should is required field name', async () => {
    const response = await routeTest({});

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(categories);
  });
});
