const testServer = require("../../jest.setup");

describe("List Client", () => {
  it("should is authorized", async () => {
    const response = await testServer.get("/cliente");

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      mensagem: "Usuario não autorizado"
    });
  });

  it("should success response", async () => {
    const response = await testServer.get("/cliente").set({
      Authorization: `${global.token}`
    });

    const [clientOne, clientTwo] = global.clients;
    const mockResponseBody = [
      {
        id: 1,
        ...clientOne,
        cep: null,
        rua: null,
        numero: null,
        bairro: null,
        cidade: null,
        estado: null
      },
      {
        id: 2,
        ...clientTwo
      }
    ];

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResponseBody);
  });
});
