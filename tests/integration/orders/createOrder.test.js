const testServer = require("../../jest.setup");
const dbConfig = require("../../../knexfile");
const environment = process.env.NODE_ENV || "development";
const knex = require("knex")(dbConfig[environment]);

const productsMock = [
  {
    descricao: "productJest",
    quantidade_estoque: 3,
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

const routeTest = async (body) => {
  return testServer
    .post("/pedido")
    .set({
      Authorization: `${global.token}`
    })
    .send(body);
};

describe("Create orders", () => {
  it("shoud is anauthorized", async () => {
    const response = await testServer.post(`/pedido`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ mensagem: "Usuario não autorizado" });
  });

  it("shoud be required cliente_id", async () => {
    const response = await routeTest();

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo cliente_id é obrigatório"
    });
  });

  it("shoud not be string cliente_id", async () => {
    const response = await routeTest({
      cliente_id: ""
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo cliente_id deve ser um número"
    });
  });

  it("shoud not be float number cliente_id", async () => {
    const response = await routeTest({
      cliente_id: 1.5
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo cliente_id deve ser um número inteiro"
    });
  });

  it("shoud be a positive number cliente_id", async () => {
    const response = await routeTest({
      cliente_id: -3
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo cliente_id deve ser um número inteiro positivo"
    });
  });

  it("shoud be required pedido_produtos", async () => {
    const response = await routeTest({
      cliente_id: 1
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo pedido_produtos é obrigatório"
    });
  });

  it("shoud be array pedido_produtos", async () => {
    const response = await routeTest({
      cliente_id: 1,
      pedido_produtos: ""
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo pedido_produtos deve ser um array"
    });
  });

  it("shoud array minimun 1 itens in pedido_produtos", async () => {
    const response = await routeTest({
      cliente_id: 1,
      pedido_produtos: []
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo pedido_produtos deve conter pelo menos 1 item"
    });
  });

  it("shoud required object in array pedido_produtos", async () => {
    const response = await routeTest({
      cliente_id: 1,
      pedido_produtos: [""]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem:
        "Cada item em 'order_products' deve ser um objeto com 'produto_id' e 'quantidade_produto'"
    });
  });

  it("shoud required produto_id in array pedido_produtos", async () => {
    const response = await routeTest({
      cliente_id: 1,
      pedido_produtos: [{}]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo produto_id é obrigatório"
    });
  });

  it("shoud be number produto_id in array pedido_produtos", async () => {
    const response = await routeTest({
      cliente_id: 1,
      pedido_produtos: [{ produto_id: "" }]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo produto_id deve ser um número"
    });
  });

  it("shoud not be float number produto_id in array pedido_produtos", async () => {
    const response = await routeTest({
      cliente_id: 1,
      pedido_produtos: [{ produto_id: 1.5 }]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo produto_id deve ser um número inteiro"
    });
  });

  it("shoud be positive number produto_id in array pedido_produtos", async () => {
    const response = await routeTest({
      cliente_id: 1,
      pedido_produtos: [{ produto_id: -5 }]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo produto_id deve ser um número inteiro positivo"
    });
  });

  it("shoud be required quantidade_produto in array pedido_produtos", async () => {
    const response = await routeTest({
      cliente_id: 1,
      pedido_produtos: [{ produto_id: 5 }]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo quantidade_produto é obrigatório"
    });
  });

  it("shoud be number quantidade_produto in array pedido_produtos", async () => {
    const response = await routeTest({
      cliente_id: 1,
      pedido_produtos: [{ produto_id: 5, quantidade_produto: "" }]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo quantidade_produto deve ser um número"
    });
  });

  it("shoud not be float number quantidade_produto in array pedido_produtos", async () => {
    const response = await routeTest({
      cliente_id: 1,
      pedido_produtos: [{ produto_id: 5, quantidade_produto: 1.5 }]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo quantidade_produto deve ser um número inteiro"
    });
  });

  it("shoud be positive number quantidade_produto in array pedido_produtos", async () => {
    const response = await routeTest({
      cliente_id: 1,
      pedido_produtos: [{ produto_id: 5, quantidade_produto: -5 }]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo quantidade_produto deve ser pelo menos 1"
    });
  });

  it("shoud anautorized propertys unknown in array pedido_produtos", async () => {
    const response = await routeTest({
      cliente_id: 1,
      pedido_produtos: [
        { produto_id: 5, quantidade_produto: 5, propriedadeDiferente: "" }
      ]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "Uma ou mais propriedades não são permitidas"
    });
  });

  it("shoud not be empty field observation if sent", async () => {
    const response = await routeTest({
      cliente_id: 1,
      observacao: "",
      pedido_produtos: [{ produto_id: 5, quantidade_produto: 2 }]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo observação não deve estar vazio"
    });
  });

  it("shoud not be number field observation if sent", async () => {
    const response = await routeTest({
      cliente_id: 1,
      observacao: 0,
      pedido_produtos: [{ produto_id: 5, quantidade_produto: 2 }]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "A descrição não deve conter numeros"
    });
  });

  it("shoud be maximun 255 caractere in the field observation if sent", async () => {
    const response = await routeTest({
      cliente_id: 1,
      observacao:
        "012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
      pedido_produtos: [{ produto_id: 5, quantidade_produto: 2 }]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "O campo observação pode conter até 255 caracteres"
    });
  });

  it("shoud client exists", async () => {
    const response = await routeTest({
      cliente_id: 10,
      pedido_produtos: [{ produto_id: 5, quantidade_produto: 5 }]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "Cliente não encontrado"
    });
  });

  it("shoud not exist two objects with same product", async () => {
    const response = await routeTest({
      cliente_id: 1,
      pedido_produtos: [
        { produto_id: 5, quantidade_produto: 5 },
        { produto_id: 5, quantidade_produto: 5 }
      ]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "Produto com id 5 está duplicado no pedido"
    });
  });

  it("shoud exist product", async () => {
    const response = await routeTest({
      cliente_id: 1,
      pedido_produtos: [{ produto_id: 5, quantidade_produto: 5 }]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem: "Produto com id 5 não encontrado"
    });
  });

  it("shoud sufficient quantity in stoxk for order", async () => {
    const response = await routeTest({
      cliente_id: 1,
      pedido_produtos: [{ produto_id: 1, quantidade_produto: 5 }]
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      mensagem:
        "Quantidade insuficiente em estoque para o produto com id 1 / productJest"
    });
  });

  it("shoud sucess create order without observation", async () => {
    const [productOneBefore, productTwoBefore] = await knex("produtos");
    const mock = {
      cliente_id: 1,
      pedido_produtos: [
        { produto_id: productOneBefore.id, quantidade_produto: 2 },
        { produto_id: productTwoBefore.id, quantidade_produto: 5 }
      ]
    };

    const responseBody = {
      id: 1,
      cliente_id: mock.cliente_id,
      observacao: null,
      valor_total: 0
    };

    const { pedido_produtos } = mock;
    for (let i = 0; i < pedido_produtos.length; i++) {
      responseBody.valor_total +=
        pedido_produtos[i].quantidade_produto * productsMock[i].valor;
    }

    const response = await routeTest(mock);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(responseBody);

    const [productOneAfter, productTwoAfter] = await knex("produtos");
    const [pedidoProdutoOne, pedidoProdutoTwo] = pedido_produtos;

    expect(productOneAfter.quantidade_estoque).toEqual(
      productOneBefore.quantidade_estoque - pedidoProdutoOne.quantidade_produto
    );
    expect(productTwoAfter.quantidade_estoque).toEqual(
      productTwoBefore.quantidade_estoque - pedidoProdutoTwo.quantidade_produto
    );
  });
});
