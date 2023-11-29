const testServer = require('../../jest.setup');

const routeTest = async (body) => {
  return testServer
    .get('/usuario')
    .set({
      Authorization: `${global.token}`,
      User: JSON.stringify({ id: 1 }),
    })
    .send(body);
};

describe('Detail users', () => {
  it('should detail user', async () => {
    const response = await routeTest({
      email: 'teste@teste.com',
      senha: '12345',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      nome: 'testeJest',
      email: 'teste@jest.com',
    });
  });
});
