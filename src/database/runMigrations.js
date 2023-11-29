const dbConfig = require('../../knexfile');
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(dbConfig[environment]);

const runMigrations = async () => {
  try {
    await knex.migrate.latest();
  } catch (error) {
    throw new Error('database connction failure');
  } finally {
    await knex.destroy();
  }
};

module.exports = runMigrations;
