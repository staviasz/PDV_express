const testServer = require("../../jest.setup");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const dbConfig = require("../../../knexfile");
const environment = process.env.NODE_ENV || "development";
const knex = require("knex")(dbConfig[environment]);

const routeTest = async (id) => {
  return testServer.delete(`/produto/${id}`).set({
    Authorization: `${global.token}`,
  });
};
const productsMock = [
  {
    descricao: "productJest",
    quantidade_estoque: 10,
    valor: 100,
    categoria_id: 3,
  },
  {
    descricao: "productJest2",
    quantidade_estoque: 11,
    valor: 100,
    categoria_id: 2,
  },
  {
    descricao: "productJest3",
    quantidade_estoque: 12,
    valor: 100,
    categoria_id: 2,
  },
];
beforeAll(async () => {
  await knex("produtos").insert(productsMock);
  await knex("pedido_produtos").insert({
    pedido_id: 1,
    quantidade_produto: 10,
    valor_produto: 1000,
    produto_id: 2,
  });
});

describe("Delete products", () => {
  it("should is authorized", async () => {
    const response = await testServer.delete("/produto/1");

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      mensagem: "Usuario não autorizado",
    });
  });

  it("should error product nonexistent", async () => {
    const response = await routeTest("10");

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ mensagem: "Produto não encontrado." });
  });

  it("should success response without image", async () => {
    const response = await routeTest("1");
    const data = await knex("produtos");
    for (let i = 0; i < productsMock.length; i++) {
      productsMock[i].id = i + 1;
      productsMock[i].produto_imagem = null;
    }

    expect(data).toEqual(productsMock.slice(1));
    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should success response with image", async () => {
    const imagePath = path.resolve(
      __dirname,
      "../../assets/marcação de exames.jpg",
    );
    const imageBuffer = fs.readFileSync(imagePath);
    const response = await testServer
      .post("/produto")
      .set({
        Authorization: `${global.token}`,
        "Content-Type": "multipart/form-data",
      })
      .field("descricao", "produto2")
      .field("quantidade_estoque", 100)
      .field("valor", 100)
      .field("categoria_id", 1)
      .attach("produto_imagem", imageBuffer, "marcação de exames.jpg");

    const imageUrl = response.body.produto_imagem;

    const responseDel = await routeTest(response.body.id.toString());
    const data = await knex("produtos");
    for (let i = 0; i < productsMock.length; i++) {
      productsMock[i].id = i + 1;
      productsMock[i].produto_imagem = null;
    }

    expect(data).toEqual(productsMock.slice(1));
    expect(responseDel.statusCode).toBe(204);
    expect(responseDel.body).toEqual({});
    await axios.get(imageUrl).catch((error) => {
      expect(error.response.status).toBe(404);
    });
  }, 6000);

  it("should success response without image", async () => {
    const response = await routeTest("2");
    const data = await knex("produtos");
    for (let i = 0; i < productsMock.length; i++) {
      productsMock[i].id = i + 1;
      productsMock[i].produto_imagem = null;
    }

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O produto está vinculado a um pedido e não pode ser excluído.",
    });
    expect(data).toEqual(productsMock.slice(1));
  });
});
