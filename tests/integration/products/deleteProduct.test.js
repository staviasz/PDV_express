const testServer = require("../../jest.setup");
const dbConfig = require("../../../knexfile");
const environment = process.env.NODE_ENV || "development";
const knex = require("knex")(dbConfig[environment]);

const routeTest = async (id) => {
  return testServer.delete(`/produto/${id}`).set({
    Authorization: `${global.token}`
  });
};
const productsMock = [
  {
    descricao: "productJest",
    quantidade_estoque: 10,
    valor: 100,
    categoria_id: 3
  },
  {
    descricao: "productJest2",
    quantidade_estoque: 11,
    valor: 100,
    categoria_id: 2
  },
  {
    descricao: "productJest3",
    quantidade_estoque: 12,
    valor: 100,
    categoria_id: 2
  }
];
beforeAll(async () => {
  await knex("produtos").insert(productsMock);
});

describe("Delete products", () => {
  it("should is authorized", async () => {
    const response = await testServer.delete("/produto/1");

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      mensagem: "Usuario não autorizado"
    });
  });

  it("should error product nonexistent", async () => {
    const response = await routeTest("10");

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ mensagem: "Produto não encontrado." });
  });

  it("should success response", async () => {
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
});
