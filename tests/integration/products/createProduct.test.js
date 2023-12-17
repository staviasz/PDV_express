const testServer = require("../../jest.setup");
const fs = require("fs");
const path = require("path");

const routeTest = async (body) => {
  return testServer
    .post("/produto")
    .set({
      Authorization: `${global.token}`
    })
    .send(body);
};

describe("Create Products", () => {
  it("should is authorized", async () => {
    const response = await testServer.post("/produto").send({
      quantidade_estoque: 0,
      valor: 100,
      categoria_id: 0
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      mensagem: "Usuario não autorizado"
    });
  });

  it("should is required field description", async () => {
    const response = await routeTest({
      quantidade_estoque: 0,
      valor: 100,
      categoria_id: 0
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo descrição é obrigatório"
    });
  });

  it("should is not empty field description", async () => {
    const response = await routeTest({
      descricao: "",
      quantidade_estoque: 0,
      valor: 100,
      categoria_id: 0
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo descrição é obrigatório"
    });
  });

  it("should contain minimum 5 caracteres field description", async () => {
    const response = await routeTest({
      descricao: "abcd",
      quantidade_estoque: 0,
      valor: 100,
      categoria_id: 0
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "A descrição deve conter entre 5 e 255 caracteres"
    });
  });

  it("should contain maximum 255 caracteres field description", async () => {
    const response = await routeTest({
      descricao:
        "abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz,abcdefghijlmnopqrstuvxz",
      quantidade_estoque: 0,
      valor: 100,
      categoria_id: 0
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "A descrição deve conter entre 5 e 255 caracteres"
    });
  });

  it("should not type number im field description", async () => {
    const response = await routeTest({
      descricao: 1000,
      quantidade_estoque: 0,
      valor: 100,
      categoria_id: 0
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "A descrição não deve conter numeros"
    });
  });

  it("should is required field amount", async () => {
    const response = await routeTest({
      descricao: "produto1",
      valor: 100,
      categoria_id: 0
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo quantidade de estoque é obrigatório"
    });
  });

  it("should is number field amount", async () => {
    const response = await routeTest({
      descricao: "produto1",
      quantidade_estoque: "teste",
      valor: 100,
      categoria_id: 0
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "A quantidade de estoque deve conter apenas numeros"
    });
  });

  it("should is a positive number field amount", async () => {
    const response = await routeTest({
      descricao: "produto1",
      quantidade_estoque: -5,
      valor: 100,
      categoria_id: 0
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo quantidade de estoque não permite numeros negativo"
    });
  });

  it("should not is a float number field amount", async () => {
    const response = await routeTest({
      descricao: "produto1",
      quantidade_estoque: 5.5,
      valor: 100,
      categoria_id: 0
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem:
        "O campo quantidade de estoque não permite numeros com ponto flotuante"
    });
  });

  it("should is required field value", async () => {
    const response = await routeTest({
      descricao: "produto1",
      quantidade_estoque: 100,
      categoria_id: 0
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo valor é obrigatório"
    });
  });

  it("should is number field value", async () => {
    const response = await routeTest({
      descricao: "produto1",
      quantidade_estoque: 100,
      valor: "teste",
      categoria_id: 0
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "A valor deve conter apenas numeros"
    });
  });

  it("should is a positive number field value", async () => {
    const response = await routeTest({
      descricao: "produto1",
      quantidade_estoque: 5,
      valor: -100,
      categoria_id: 0
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo valor não permite numeros negativo"
    });
  });

  it("should not is a float number field value", async () => {
    const response = await routeTest({
      descricao: "produto1",
      quantidade_estoque: 5,
      valor: 100.5,
      categoria_id: 0
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem:
        "O campo valor não permite numeros com ponto flotuante, digite o valor em centavos"
    });
  });

  it("should is a positive number field category_id", async () => {
    const response = await routeTest({
      descricao: "produto1",
      quantidade_estoque: 5,
      valor: 100,
      categoria_id: 0
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo categoria_id não permite numeros negativo"
    });
  });

  it("should not is a float number field category_id", async () => {
    const response = await routeTest({
      descricao: "produto1",
      quantidade_estoque: 5,
      valor: 100,
      categoria_id: 0.5
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo categoria_id não permite numeros com ponto flotuante"
    });
  });

  it("should is required field category_id", async () => {
    const response = await routeTest({
      descricao: "produto1",
      quantidade_estoque: 100,
      valor: 100
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo categoria_id é obrigatório"
    });
  });

  it("should is number field category_id", async () => {
    const response = await routeTest({
      descricao: "produto1",
      quantidade_estoque: 100,
      valor: 100,
      categoria_id: "a"
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "A categoria_id deve conter apenas numeros"
    });
  });

  it("should not exists category_id in table categorias", async () => {
    const response = await routeTest({
      descricao: "produto1",
      quantidade_estoque: 100,
      valor: 100,
      categoria_id: 50
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "A categoria não encontrada"
    });
  });

  it("should success response", async () => {
    const mockProduct = {
      descricao: "produto1",
      quantidade_estoque: 100,
      valor: 100,
      categoria_id: 1
    };

    mockProduct.id = 1;
    mockProduct.produto_imagem = null;

    const response = await routeTest(mockProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(mockProduct);
  });

  it("should success response with image", async () => {
    const imagePath = path.resolve(
      __dirname,
      "../../assets/marcação de exames.jpg"
    );
    const imageBuffer = fs.readFileSync(imagePath);
    const mockProduct = {
      id: 2,
      descricao: "produto2",
      quantidade_estoque: 100,
      valor: 100,
      categoria_id: 1
    };

    const response = await testServer
      .post("/produto")
      .set({
        Authorization: `${global.token}`,
        "Content-Type": "multipart/form-data"
      })
      .field("descricao", "produto2")
      .field("quantidade_estoque", 100)
      .field("valor", 100)
      .field("categoria_id", 1)
      .attach("produto_imagem", imageBuffer, "marcação de exames.jpg");
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(mockProduct));
    expect(response.body.produto_imagem).toEqual(
      expect.stringContaining(
        "https://bitbarbaros.s3.us-east-005.backblazeb2.com/marcacao-de-exames"
      )
    );
  });
});
