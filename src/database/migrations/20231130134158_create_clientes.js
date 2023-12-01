/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const tableExists = await knex.schema.hasTable('clientes');

  if (!tableExists) {
    return knex.schema.createTable('clientes', (table) => {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('email').unique().notNullable();
      table.string('cpf', 11).unique().notNullable();
      table.string('cep', 8);
      table.string('rua', 255);
      table.string('numero', 20);
      table.string('bairro', 255);
      table.string('cidade', 255);
      table.string('estado', 255);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('clientes');
};
