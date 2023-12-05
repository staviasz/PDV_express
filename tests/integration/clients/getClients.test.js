const testServer = require("../../jest.setup");

describe("Get Client", () => {
  it("should is authorized", async () => {
    const response = await testServer.get("/cliente/1");

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      mensagem: "Usuario não autorizado",
    });
  });

  it("should id associated anything account", async () => {
    const response = await testServer.get("/cliente/10").set({
      Authorization: `${global.token}`,
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ mensagem: "Cliente não encontrado" });
  });

  it("should get client of the id", async () => {
    const response = await testServer.get("/cliente/2").set({
      Authorization: `${global.token}`,
    });

    const client = global.clients[1];
    client.id = 2;
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(client);
  });
});
