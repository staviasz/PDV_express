const testServer = require('../../jest.setup');
const dbConfig = require('../../../knexfile');
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(dbConfig[environment]);

const productsMock = [
  {
    descricao: 'productJest',
    quantidade_estoque: 10,
    valor: 100,
    categoria_id: 3,
  },
  {
    descricao: 'productJest2',
    quantidade_estoque: 11,
    valor: 100,
    categoria_id: 2,
  },
  {
    descricao: 'productJest3',
    quantidade_estoque: 12,
    valor: 100,
    categoria_id: 2,
  },
];
beforeAll(async () => {
  await knex('produtos').insert(productsMock);
});

describe('Detail product', () => {
  it('should is authorized', async () => {
    const response = await testServer.get('/produto/1');

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      mensagem: 'Usuario não autorizado',
    });
  });

  it('should return error of not exists product', async () => {
    const response = await testServer.get('/produto/100').set({
      Authorization: `${global.token}`,
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: 'Produto não encontrado.',
    });
  });

  it('should success response', async () => {
    const response = await testServer.get('/produto/1').set({
      Authorization: `${global.token}`,
    });
    const [mockResponseBody] = productsMock;
    mockResponseBody.id = 1;

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResponseBody);
  });
});
