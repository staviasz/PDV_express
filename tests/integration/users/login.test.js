const testServer = require('../../jest.setup');

const routeTest = async (body) => {
  return testServer.post('/login').send(body);
};

describe('Login users', () => {
  it('should not correct email format', async () => {
    const response = await routeTest({
      nome: 'teste',
      email: 'testeteste.com',
      senha: '12345',
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: 'O campo email precisa ter um formato válido',
    });
  });

  it('should is required field email ', async () => {
    const response = await routeTest({
      nome: 'teste',
      senha: '12345',
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: 'O campo email é obrigatório',
    });
  });

  it('should field email is not empty', async () => {
    const response = await routeTest({
      nome: 'teste',
      email: '',
      senha: '12345',
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: 'O campo email é obrigatório',
    });
  });

  it('should contain only caracteres in the field email', async () => {
    const response = await routeTest({
      nome: 'teste',
      email: 1234,
      senha: '12345',
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: 'O email não deve conter numeros',
    });
  });

  it('should is required the field password', async () => {
    const response = await routeTest({
      nome: 'teste',
      email: 'teste@teste.com',
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: 'O campo senha é obrigatório',
    });
  });

  it('should not empty the field password', async () => {
    const response = await routeTest({
      nome: 'teste',
      email: 'teste@teste.com',
      senha: '',
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: 'O campo senha é obrigatório',
    });
  });

  it('should minimum 5 caracteres in the field password', async () => {
    const response = await routeTest({
      nome: 'teste',
      email: 'teste@teste.com',
      senha: '12',
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: 'A senha deve conter entre 5 e 25 caracteres',
    });
  });

  it('should maximum 25 caracteres in the field password', async () => {
    const response = await routeTest({
      nome: 'teste',
      email: 'teste@teste.com',
      senha: '12345678912345678978963254',
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: 'A senha deve conter entre 5 e 25 caracteres',
    });
  });

  it('should contain only caracteres in the field password', async () => {
    const response = await routeTest({
      nome: 'teste',
      email: 'teste@teste.com',
      senha: 12345,
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: 'A senha não deve conter numeros',
    });
  });

  it('should not found user', async () => {
    const response = await routeTest({
      email: 'teste@teste.com',
      senha: '12345',
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: 'Usuário não encontrado',
    });
  });

  it('should error password login', async () => {
    const response = await routeTest({
      email: 'teste@jest.com',
      senha: '12345678910',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: 'Email e senha não confere',
    });
  });

  it('should do login user', async () => {
    const response = await routeTest({
      email: 'teste@jest.com',
      senha: '123456789',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.usuario).toEqual({
      id: 1,
      nome: 'testeJest',
      email: 'teste@jest.com',
    });
    expect(typeof response.body.token).toBe('string');
  });
});
