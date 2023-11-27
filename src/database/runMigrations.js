const knex = require('knex');
const dbConfig = require('../../knexfile');

const runMigrations = async () => {
  const database = knex(dbConfig);

  try {
    await database.migrate.latest();
  } catch (error) {
    console.log(error);
    throw new Error('database connction failure');
  } finally {
    await database.destroy();
  }
};

module.exports = runMigrations;
