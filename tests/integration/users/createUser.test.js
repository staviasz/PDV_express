const testServer = require("../../jest.setup");

const routeTest = async (body) => {
  return testServer.post("/usuario").send(body);
};

describe("Create users", () => {
  it("should is required field name", async () => {
    const response = await routeTest({
      email: "teste@teste.com",
      senha: "12345"
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: "O campo nome é obrigatório"
    });
  });

  it("should not empty the field name", async () => {
    const response = await routeTest({
      nome: "",
      email: "teste@teste.com",
      senha: "12345"
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: "O campo nome é obrigatório"
    });
  });

  it("should contain only caracteres in the field name", async () => {
    const response = await routeTest({
      nome: 12345,
      email: "teste@teste.com",
      senha: "12345"
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: "O nome não deve conter numeros"
    });
  });

  it("should minimum 3 caracteres in the field name", async () => {
    const response = await routeTest({
      nome: "aÃ",
      email: "teste@teste.com",
      senha: "12345"
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: "O nome deve conter no minimo 3 caracteres"
    });
  });

  it("should not caractere numeric in the field name", async () => {
    const response = await routeTest({
      nome: "12",
      email: "teste@teste.com",
      senha: "12345"
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: "O nome não deve conter numeros"
    });
  });

  it("should not correct email format", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "testeteste.com",
      senha: "12345"
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: "O campo email precisa ter um formato válido"
    });
  });

  it("should is required field email ", async () => {
    const response = await routeTest({
      nome: "teste",
      senha: "12345"
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: "O campo email é obrigatório"
    });
  });

  it("should field email is not empty", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "",
      senha: "12345"
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: "O campo email é obrigatório"
    });
  });

  it("should contain only caracteres in the field email", async () => {
    const response = await routeTest({
      nome: "teste",
      email: 1234,
      senha: "12345"
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: "O email não deve conter numeros"
    });
  });

  it("should is required the field password", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com"
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: "O campo senha é obrigatório"
    });
  });

  it("should not empty the field password", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      senha: ""
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: "O campo senha é obrigatório"
    });
  });

  it("should minimum 5 caracteres in the field password", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      senha: "12"
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: "A senha deve conter entre 5 e 25 caracteres"
    });
  });

  it("should maximum 25 caracteres in the field password", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      senha: "12345678912345678978963254"
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: "A senha deve conter entre 5 e 25 caracteres"
    });
  });

  it("should contain only caracteres in the field password", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      senha: 12345
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: "A senha não deve conter numeros"
    });
  });

  it("should success response", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      senha: "12345"
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: 2,
      nome: "teste",
      email: "teste@teste.com"
    });
  });

  it("should email exists", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      senha: "12345"
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: "Email já cadastrado"
    });
  });
});
