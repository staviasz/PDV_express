require("dotenv").config();
const app = require("./server/server");
const runMigrations = require("./database/runMigrations");

runMigrations().then(() => {
  try {
    app.listen(process.env.PORT_APP);
  } catch (error) {
    throw new Error("Server error");
  }
});
