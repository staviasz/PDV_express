const testServer = require('../../jest.setup');

describe('Get Client', () => {
  it('should is authorized', async () => {
    const response = await testServer
      .post('/cliente/1')
      .send(global.clients[0]);

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      mensagem: 'Usuario não autorizado',
    });
  });

  it('should get client of the id', async () => {
    const response = await testServer.get('/cliente/1').set({
      Authorization: `${global.token}`,
    });

    const [client] = global.clients;
    client.id = 1;

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(client);
  });
});
