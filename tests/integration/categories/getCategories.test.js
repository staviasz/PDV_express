const testServer = require('../../jest.setup');

const routeTest = async (body) => {
  return testServer.get('/categoria').send(body);
};

describe('Categories', () => {
  it('should list categories', async () => {
    const response = await routeTest({});

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(global.categories);
  });
});
