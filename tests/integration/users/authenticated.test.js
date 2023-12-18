const testServer = require("../../jest.setup");
const dbConfig = require("../../../knexfile");
const environment = process.env.NODE_ENV || "development";
const knex = require("knex")(dbConfig[environment]);

const routeTest = async (body) => {
  return testServer
    .put("/usuario")
    .set({
      Authorization: `${global.token}`,
      User: JSON.stringify({ id: 1 })
    })
    .send(body);
};

describe("Authenticated users", () => {
  it("should user unauthorized", async () => {
    const response = await testServer.put("/usuario").send({});

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      mensagem: "Usuario não autorizado"
    });
  });

  it("should user unauthorized", async () => {
    await knex("usuarios").where({ id: 1 }).del();
    const response = await routeTest({});

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      mensagem: "Usuario não encontrado"
    });
  });
});
