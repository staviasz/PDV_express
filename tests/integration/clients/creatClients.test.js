const testServer = require("../../jest.setup");
const dbConfig = require("../../../knexfile");
const environment = process.env.NODE_ENV || "development";
const knex = require("knex")(dbConfig[environment]);

const routeTest = async (body) => {
  return testServer
    .post("/cliente")
    .set({
      Authorization: `${global.token}`,
    })
    .send(body);
};

const formatCpf = (cpf) => {
  return cpf.replace(/\D/g, "");
};

afterEach(async () => {
  await knex("clientes").where({ nome: "teste" }).del();
});

describe("Create clients", () => {
  it("should is authorized", async () => {
    const response = await testServer.post("/cliente");
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      mensagem: "Usuario não autorizado",
    });
  });
  it("should is required field nome", async () => {
    const response = await routeTest({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo nome é obrigatório",
    });
  });
  it("should not is empty field nome", async () => {
    const response = await routeTest({
      nome: "",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo nome é obrigatório",
    });
  });
  it("should not is number field nome", async () => {
    const response = await routeTest({
      nome: 123,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O nome não deve conter numeros",
    });
  });
  it("should not is caracteres numerics field nome", async () => {
    const response = await routeTest({
      nome: "123",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O nome não deve conter numeros",
    });
  });
  it("should minimum 3 caracteres field nome", async () => {
    const response = await routeTest({
      nome: "ab",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O nome deve conter no minimo 3 caracteres",
    });
  });
  it("should maximum 255 caracteres field nome", async () => {
    const response = await routeTest({
      nome: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O nome deve conter no maximo 255 caracteres",
    });
  });
  it("should is required field email", async () => {
    const response = await routeTest({
      nome: "teste",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo email é obrigatório",
    });
  });
  it("should not is empty field email", async () => {
    const response = await routeTest({
      nome: "teste",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo email é obrigatório",
    });
  });
  it("should not is number field email", async () => {
    const response = await routeTest({
      nome: "teste",
      email: 123,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O email não deve conter numeros",
    });
  });
  it("should valid format field email", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "testeteste.com",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo email precisa ter um formato válido",
    });
  });
  it("should is required field cpf", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo CPF é obrigatório",
    });
  });
  it("should not is empty field cpf", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo CPF é obrigatório",
    });
  });
  it("should not is number field cpf", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: 123,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O CPF não deve conter numeros",
    });
  });
  it("should minimum 11 charactres field cpf", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "1234567890",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O CPF deve conter no minimo 11 caracteres",
    });
  });
  it("should maximum 14 charactres charactres field cpf", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "123456789012345",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O CPF deve conter no maximo 14 caracteres",
    });
  });
  it("should not have letters in the field cpf", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "a1234567890",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O CPF permite apenas digitos, (.) e (-)",
    });
  });
  it("should not have special characters in the field cpf", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "*1234567890",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O CPF permite apenas digitos, (.) e (-)",
    });
  });
  it("should error invalid cpf", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "11234567890",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "CPF inválido",
    });
  });
  it("should not is empty field cep", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "12345678910",
      cep: "",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo CEP não pode estar vazio",
    });
  });
  it("should not is less than 8 charactres field cep", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "12345678900",
      cep: "1234567",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O CEP deve ter exatamente 8 dígitos",
    });
  });
  it("should not is loger than 8 charactres field cep", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "12345678901",
      cep: "123456789",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O CEP deve ter exatamente 8 dígitos",
    });
  });
  it("should not have characters in the field cep", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "01234567890",
      cep: "-1234567",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O CEP deve conter apenas números",
    });
  });
  it("should not have special characters in the field cep", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "10234567890",
      cep: "*1234567",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O CEP deve conter apenas números",
    });
  });
  it("should not is number field cep", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "10234567890",
      cep: 12345678,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O CEP não deve conter numeros",
    });
  });
  it("should not is empty field rua", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "01234567890",
      rua: "",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo rua não pode estar vazio",
    });
  });
  it("should maximum 255 caracteres field rua", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "10234567890",
      rua: "abcdefghihlmnopqrstuvxzabcdefghihlmnopqrstuvxzabcdefghihlmnopqrstuvxzabcdefghihlmnopqrstuvxzabcdefghihlmnopqrstuvxzabcdefghihlmnopqrstuvxzabcdefghihlmnopqrstuvxzabcdefghihlmnopqrstuvxzabcdefghihlmnopqrstuvxzabcdefghihlmnopqrstuvxzabcdefghihlmnopqrstuvxzabcdefghihlmnopqrstuvxz",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo rua deve conter no maximo 255 caracteres",
    });
  });
  it("should not is number field rua", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "10234567890",
      rua: 12345678,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo rua não deve conter numeros",
    });
  });
  it("should not is empty field numero", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "01234567890",
      numero: "",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo numero não pode estar vazio",
    });
  });
  it("should maximum 20 caracteres field numero", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "10234567890",
      numero: "123456789123456789123456789",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo numero deve conter no maximo 20 caracteres",
    });
  });
  it("should not is number field numero", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "10234567890",
      numero: 12345678,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo numero deve ser uma string",
    });
  });
  it("should not have characters in the field numero", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "01234567890",
      numero: "abcdefghihlmnopqrstuvxz",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O numero deve conter apenas digitos",
    });
  });
  it("should not have special characters in the field numero", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "01234567890",
      numero: "-*/)",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O numero deve conter apenas digitos",
    });
  });
  it("should not is empty field bairro", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "01234567890",
      bairro: "",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo bairro não pode estar vazio",
    });
  });
  it("should maximum 255 caracteres field bairro", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "10234567890",
      bairro:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo bairro deve conter no maximo 255 caracteres",
    });
  });
  it("should not is number field bairro", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "10234567890",
      bairro: 12345678,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo bairro deve ser uma string",
    });
  });
  it("should not is empty field cidade", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "01234567890",
      cidade: "",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo cidade não pode estar vazio",
    });
  });
  it("should maximum 255 caracteres field cidade", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "10234567890",
      cidade:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo cidade deve conter no maximo 255 caracteres",
    });
  });
  it("should not is number field cidade", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "10234567890",
      cidade: 12345678,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo cidade deve ser uma string",
    });
  });
  it("should not have characters in the field cidade", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "01234567890",
      cidade: "*/+~-",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo cidade não aceita digitos e caracteres especiais",
    });
  });
  it("should not have special characters in the field cidade", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "01234567890",
      cidade: "02989498",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo cidade não aceita digitos e caracteres especiais",
    });
  });
  it("should not is empty field estado", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "01234567890",
      estado: "",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo estado não pode estar vazio",
    });
  });
  it("should maximum 255 caracteres field estado", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "10234567890",
      estado:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo estado deve conter no maximo 255 caracteres",
    });
  });
  it("should not is number field estado", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "10234567890",
      estado: 12345678,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo estado deve ser uma string",
    });
  });
  it("should not have characters in the field estado", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "01234567890",
      estado: "*/+~-",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo estado não aceita digitos e caracteres especiais",
    });
  });
  it("should not have special characters in the field estado", async () => {
    const response = await routeTest({
      nome: "teste",
      email: "teste@teste.com",
      cpf: "01234567890",
      estado: "02989498",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo estado não aceita digitos e caracteres especiais",
    });
  });
  it("should email exists", async () => {
    const [client] = global.clients;
    const response = await routeTest(client);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ mensagem: "Email já cadastrado" });
  });
  it("should email exists", async () => {
    const [client] = global.clients;
    client.email = "emai@update.com";
    const response = await routeTest(client);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ mensagem: "CPF já cadastrado" });
  });
  it("should succes response with required fields", async () => {
    const clientMock = {
      nome: "teste",
      email: "teste@teste.com",
      cpf: "0123456789-0",
    };
    const cleanCpf = clientMock.cpf.replace(/\D/g, "");
    const response = await routeTest(clientMock);
    const responseBody = {
      id: 3,
      ...clientMock,
      cpf: cleanCpf,
      cep: null,
      rua: null,
      numero: null,
      bairro: null,
      cidade: null,
      estado: null,
    };
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(responseBody);
  });
  it("should success with one filed not required", async () => {
    const clientMock = {
      nome: "teste",
      email: "teste1@teste.com",
      cpf: "01234567890",
      cep: "12345678",
    };
    const response = await routeTest(clientMock);
    const responseBody = {
      id: 4,
      ...clientMock,
      rua: null,
      numero: null,
      bairro: null,
      cidade: null,
      estado: null,
    };
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(responseBody);
  });
  it("should success with two filed not required", async () => {
    const clientMock = {
      nome: "teste",
      email: "teste1@teste.com",
      cpf: "01234567890",
      cep: "12345678",
      rua: "Rio de janeiro",
    };
    const response = await routeTest(clientMock);
    const responseBody = {
      id: 5,
      ...clientMock,
      numero: null,
      bairro: null,
      cidade: null,
      estado: null,
    };

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(responseBody);
  });
  it("should success with tree filed not required", async () => {
    const clientMock = {
      nome: "teste",
      email: "teste1@teste.com",
      cpf: "012.345.678-90",
      cep: "12345678",
      rua: "Rio de janeiro",
      numero: "123",
    };
    const response = await routeTest(clientMock);
    const responseBody = {
      id: 6,
      ...clientMock,
      cpf: formatCpf(clientMock.cpf),
      bairro: null,
      cidade: null,
      estado: null,
    };
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(responseBody);
  });
  it("should success with four filed not required", async () => {
    const clientMock = {
      nome: "teste",
      email: "teste1@teste.com",
      cpf: "01234567890",
      cep: "12345678",
      rua: "Rio de janeiro",
      numero: "123",
      bairro: "bairo de teste",
    };
    const response = await routeTest(clientMock);
    const responseBody = {
      id: 7,
      ...clientMock,
      cidade: null,
      estado: null,
    };
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(responseBody);
  });
  it("should success with five filed not required", async () => {
    const clientMock = {
      nome: "teste",
      email: "teste1@teste.com",
      cpf: "01234567890",
      cep: "12345678",
      rua: "Rio de janeiro",
      numero: "123",
      bairro: "bairo de teste",
      cidade: "salvador",
    };
    const response = await routeTest(clientMock);
    const responseBody = {
      id: 8,
      ...clientMock,
      estado: null,
    };
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(responseBody);
  });
  it("should success with six filed not required", async () => {
    const clientMock = {
      nome: "teste",
      email: "teste1@teste.com",
      cpf: "01234567890",
      cep: "12345678",
      rua: "Rio de janeiro",
      numero: "123",
      bairro: "bairo de teste",
      cidade: "salvador",
      estado: "bahia",
    };
    const response = await routeTest(clientMock);
    const responseBody = {
      id: 9,
      ...clientMock,
    };
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(responseBody);
  });
});
