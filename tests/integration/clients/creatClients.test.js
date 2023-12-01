const testServer = require('../../jest.setup');

const routeTest = async (body) => {
  return testServer
    .post('/cliente')
    .set({
      Authorization: `${global.token}`,
    })
    .send(body);
};

describe('Create clients', () => {
  it('should is authorized', async () => {
    const response = await testServer.post('/cliente');

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      mensagem: 'Usuario não autorizado',
    });
  });

  it('should is required field nome', async () => {
    const response = await routeTest({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: 'O campo nome é obrigatório',
    });
  });

  it('should not is empty field nome', async () => {
    const response = await routeTest({
      nome: '',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: 'O campo nome é obrigatório',
    });
  });

  it('should not is number field nome', async () => {
    const response = await routeTest({
      nome: 123,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: 'O nome não deve conter numeros',
    });
  });

  it('should not is caracteres numerics field nome', async () => {
    const response = await routeTest({
      nome: '123',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: 'O nome não deve conter numeros',
    });
  });

  it('should minimum 3 caracteres field nome', async () => {
    const response = await routeTest({
      nome: 'ab',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: 'O nome deve conter no minimo 3 caracteres',
    });
  });

  // it('should maximum 255 caracteres field nome', async () => {
  //   const response = await routeTest({
  //     nome: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  //   });

  //   expect(response.statusCode).toBe(400);
  //   expect(response.body).toEqual({
  //     mensagem: 'O nome deve conter no maximo 255 caracteres',
  //   });
  // });

  it('should is required field email', async () => {
    const response = await routeTest({
      nome: 'teste',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: 'O campo email é obrigatório',
    });
  });

  it('should not is empty field email', async () => {
    const response = await routeTest({
      nome: 'teste',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: 'O campo email é obrigatório',
    });
  });

  it('should not is number field email', async () => {
    const response = await routeTest({
      nome: 'teste',
      email: 123,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: 'O email não deve conter numeros',
    });
  });

  it('should valid format field email', async () => {
    const response = await routeTest({
      nome: 'teste',
      email: 'testeteste.com',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: 'O campo email precisa ter um formato válido',
    });
  });

  it('should is required field email', async () => {
    const response = await routeTest({
      nome: 'teste',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: 'O campo email é obrigatório',
    });
  });

  it('should not is empty field email', async () => {
    const response = await routeTest({
      nome: 'teste',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: 'O campo email é obrigatório',
    });
  });
});
