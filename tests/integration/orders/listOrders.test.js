const testServer = require("../../jest.setup");
const dbConfig = require("../../../knexfile");
const environment = process.env.NODE_ENV || "development";
const knex = require("knex")(dbConfig[environment]);

const mockOrders = [
  {
    pedido: { id: 1, valor_total: 2000, observacao: null, cliente_id: 1 },
    pedido_produtos: [
      {
        id: 1,
        quantidade_produto: 10,
        valor_produto: 1000,
        pedido_id: 1,
        produto_id: 1,
      },
      {
        id: 2,
        quantidade_produto: 20,
        valor_produto: 1000,
        pedido_id: 1,
        produto_id: 2,
      },
    ],
  },
  {
    pedido: { id: 2, valor_total: 3000, observacao: null, cliente_id: 1 },
    pedido_produtos: [
      {
        id: 1,
        quantidade_produto: 10,
        valor_produto: 1000,
        pedido_id: 2,
        produto_id: 1,
      },
      {
        id: 2,
        quantidade_produto: 20,
        valor_produto: 1000,
        pedido_id: 2,
        produto_id: 2,
      },
      {
        id: 3,
        quantidade_produto: 20,
        valor_produto: 1000,
        pedido_id: 2,
        produto_id: 3,
      },
    ],
  },
  {
    pedido: { id: 3, valor_total: 1500, observacao: null, cliente_id: 2 },
    pedido_produtos: [
      {
        id: 1,
        quantidade_produto: 10,
        valor_produto: 500,
        pedido_id: 3,
        produto_id: 1,
      },
      {
        id: 2,
        quantidade_produto: 20,
        valor_produto: 1000,
        pedido_id: 3,
        produto_id: 2,
      },
    ],
  },
];

beforeAll(async () => {
  const querysOrders = [
    knex("pedidos").insert({ id: 1, cliente_id: 1, valor_total: 2000 }),
    knex("pedidos").insert({ id: 2, cliente_id: 1, valor_total: 3000 }),
    knex("pedidos").insert({ id: 3, cliente_id: 2, valor_total: 1500 }),
  ];
  await Promise.all(querysOrders);

  const querysOrdersProducts = [
    knex("pedido_produtos").insert({
      pedido_id: 1,
      quantidade_produto: 10,
      valor_produto: 1000,
      produto_id: 1,
    }),
    knex("pedido_produtos").insert({
      pedido_id: 1,
      quantidade_produto: 20,
      valor_produto: 1000,
      produto_id: 2,
    }),
    knex("pedido_produtos").insert({
      pedido_id: 2,
      quantidade_produto: 10,
      valor_produto: 1000,
      produto_id: 1,
    }),
    knex("pedido_produtos").insert({
      pedido_id: 2,
      quantidade_produto: 20,
      valor_produto: 1000,
      produto_id: 2,
    }),
    knex("pedido_produtos").insert({
      pedido_id: 2,
      quantidade_produto: 20,
      valor_produto: 1000,
      produto_id: 3,
    }),
    knex("pedido_produtos").insert({
      pedido_id: 3,
      quantidade_produto: 10,
      valor_produto: 500,
      produto_id: 1,
    }),
    knex("pedido_produtos").insert({
      pedido_id: 3,
      quantidade_produto: 20,
      valor_produto: 1000,
      produto_id: 2,
    }),
  ];
  await Promise.all(querysOrdersProducts);
});

const routeTest = async (query) => {
  return testServer.get(`/pedido?${query}`).set({
    Authorization: `${global.token}`,
  });
};

describe("List Orders", () => {
  it("should is authorized", async () => {
    const response = await testServer.get("/pedido");
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      mensagem: "Usuario não autorizado",
    });
  });

  it("should error if data cliente_id is invalid", async () => {
    const response = await routeTest("cliente_id=aaaa");

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O cliente_id tem que ser um número",
    });
  });

  it("should error cliente_id not found", async () => {
    const response = await routeTest("cliente_id=0");

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "Cliente com ID 0 não foi localizado",
    });
  });

  it("should success response without cliente_id", async () => {
    const response = await routeTest();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockOrders);
  });

  it("should success response with cliente_id", async () => {
    const responseOne = await routeTest("cliente_id=1");

    expect(responseOne.statusCode).toBe(200);
    expect(responseOne.body).toEqual(mockOrders.slice(0, 2));

    const responseTwo = await routeTest("cliente_id=2");

    expect(responseTwo.statusCode).toBe(200);
    expect(responseTwo.body).toEqual(mockOrders.slice(2));
  });
});
