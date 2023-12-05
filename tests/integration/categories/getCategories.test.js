const testServer = require("../../jest.setup");

const routeTest = async (body) => {
  return testServer.get("/categoria").send(body);
};

describe("Categories", () => {
  it("should list categories", async () => {
    for (let i = 0; i < global.categories.length; i++) {
      global.categories[i].id = i + 1;
    }
    const response = await routeTest({});

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(global.categories);
  });
});
