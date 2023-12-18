const testServer = require("../../jest.setup");
const dbConfig = require("../../../knexfile");
const environment = process.env.NODE_ENV || "development";
const knex = require("knex")(dbConfig[environment]);

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

const routeTest = async (query) => {
  return testServer.get(`/produto?${query}`).set({
    Authorization: `${global.token}`
  });
};

describe("Get products", () => {
  it("should is authorized", async () => {
    const response = await testServer.get("/produto");

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      mensagem: "Usuario não autorizado"
    });
  });

  it("should success response with all products", async () => {
    const response = await routeTest();
    for (let i = 0; i < productsMock.length; i++) {
      productsMock[i].id = i + 1;
      productsMock[i].produto_imagem = null;
    }

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(productsMock);
  });

  it("should error if the category searvh not exists", async () => {
    const response = await routeTest("categoria_id=0");

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "A categoria solicitada não existe"
    });
  });

  it("should success response with search for category unrelated with product", async () => {
    const response = await routeTest("categoria_id=1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should success response with search for category related with product", async () => {
    const response = await routeTest("categoria_id=2");
    const mockResponseBody = productsMock.slice(1);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResponseBody);
  });
});
