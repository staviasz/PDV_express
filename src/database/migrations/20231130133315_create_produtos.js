/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const tableExists = await knex.schema.hasTable('produtos');

  if (!tableExists) {
    return knex.schema.createTable('produtos', (table) => {
      table.increments('id').primary();
      table.string('descricao', 255).notNullable();
      table.integer('quantidade_estoque').notNullable();
      table.integer('valor').notNullable();
      table
        .integer('categoria_id')
        .references('id')
        .inTable('categorias')
        .notNullable();
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('produtos');
};
