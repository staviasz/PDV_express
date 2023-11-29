/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const tableExists = await knex.schema.hasTable('categorias');

  if (!tableExists) {
    return knex.schema.createTable('categorias', (table) => {
      table.increments('id').primary();
      table.string('descricao').notNullable();
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('categorias');
};
